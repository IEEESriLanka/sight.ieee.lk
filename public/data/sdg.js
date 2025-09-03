/**
 * Fetch SDG data using https://unstats.un.org/SDGAPI/swagger/
 */
import fs from "node:fs/promises";

const BASE = "https://unstats.un.org/SDGAPI/v1/sdg/Goal";
const HEADERS = { Accept: "application/json" };

// Short names for SDGs 1-17
const SDG_SHORT_NAMES = [
  "No poverty",
  "Zero hunger", 
  "Good health and well-being",
  "Quality Education",
  "Gender equality",
  "Clean water and sanitation",
  "Affordable and clean energy",
  "Decent work and economic growth",
  "Industry, innovation and infrastructure",
  "Reduced inequalities",
  "Sustainable cities and economies",
  "Responsible consumption and production",
  "Climate action",
  "Life below water",
  "Life on land",
  "Peace, justice and strong institutions",
  "Partnership for the goals"
];

// Simple retry for transient failures.
async function getJson(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(url, { headers: HEADERS });
    if (res.ok) return res.json();
    if (attempt === retries) {
      throw new Error(`HTTP ${res.status} for ${url}`);
    }
    await new Promise(r => setTimeout(r, 500 * attempt));
  }
}

(async () => {
  const goals = Array.from({ length: 17 }, (_, i) => i + 1);

  // Fetch all goals in parallel.
  const results = await Promise.all(
    goals.map(async (g) => {
      const url = `${BASE}/${g}/Target/List?includechildren=true`;
      const data = await getJson(url);
      // The API returns an object with numbered keys, extract the first (and typically only) entry
      const goalData = data[Object.keys(data)[0]];
      
      // Clean up the data structure by removing unnecessary fields
      if (goalData) {
        // Remove uri from goal level
        const { uri: goalUri, ...goalWithoutUri } = goalData;
        
        // Restructure to put short_name after title
        const { title, ...restOfGoal } = goalWithoutUri;
        const restructuredGoal = {
          ...title && { title },
          short_name: SDG_SHORT_NAMES[g - 1], // g is 1-based, array is 0-based
          ...restOfGoal
        };
        
        // Clean up targets to remove redundant fields
        if (restructuredGoal.targets) {
          restructuredGoal.targets = restructuredGoal.targets.map(target => {
            const { title, goal, uri: targetUri, ...cleanTarget } = target;
            
            // Clean up indicators to remove unnecessary fields
            if (cleanTarget.indicators) {
              cleanTarget.indicators = cleanTarget.indicators.map(indicator => {
                const { goal: indGoal, target: indTarget, tier, series, uri: indUri, ...cleanIndicator } = indicator;
                return cleanIndicator;
              });
            }
            
            return cleanTarget;
          });
        }
        
        return restructuredGoal;
      }
      
      return goalData || { code: g.toString(), title: `Goal ${g}`, description: "No data available" };
    })
  );

  // Produce a flat array with exactly 17 entries: one per goal.
  // Each entry contains the goal data directly
  const combined = results.sort((a, b) => parseInt(a.code) - parseInt(b.code));

  await fs.writeFile("sdg.json", JSON.stringify(combined, null, 2), "utf-8");
  console.log("Wrote sdg.json");
})().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
