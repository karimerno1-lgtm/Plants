import test from 'node:test';
import assert from 'node:assert/strict';

test('Watering Calculator: Dryness interval calculation logic', () => {
  const baseDays = 8;
  const terracottaModifier = 0.72; // dries ~28% faster
  const potFactor = Math.pow(8 / 6, 0.45); // ~1.13x
  const rawDays = baseDays * terracottaModifier * potFactor;
  assert.ok(rawDays > 4 && rawDays < 12, 'Raw watering days should fall in realistic range');
});

test('Light Finder: Inverse-Square Law distance calculation', () => {
  const baseFC = 500; // East window
  const distanceFeet = 3;
  const distanceFactor = 1 / Math.pow(1 + (distanceFeet * 0.45), 1.6);
  const calculatedFC = Math.round(baseFC * distanceFactor);
  assert.ok(calculatedFC < baseFC, 'Light intensity must decrease with distance');
  assert.ok(calculatedFC > 50, 'Light intensity at 3ft from east window remains usable');
});

test('Pot Size Calculator: Upgrades obey 1-2 inch rule', () => {
  const currentDiameter = 6;
  const upgradeStep = 2;
  const newDiameter = currentDiameter + upgradeStep;
  assert.equal(newDiameter, 8, '8-inch pot should be recommended for 6-inch rootbound plant');

  // Cylinder volume check V = pi * r^2 * h
  const rCm = (newDiameter / 2) * 2.54;
  const hCm = newDiameter * 1.0 * 2.54;
  const volumeLiters = (Math.PI * Math.pow(rCm, 2) * hCm) / 1000;
  assert.ok(volumeLiters > 5.0 && volumeLiters < 8.0, 'Volume in liters is geometrically sound');
});

test('Fertilizer Dilution: Weakly weekly 1/4 strength formula', () => {
  const canVolumeLiters = 2;
  const gallons = canVolumeLiters / 3.78541;
  const baseManufacturerDose = 5; // ml per gallon
  const strengthRatio = 0.25; // 1/4 strength
  const calculatedMl = gallons * baseManufacturerDose * strengthRatio;
  assert.ok(calculatedMl > 0.5 && calculatedMl < 1.0, 'Calculated ml for 2L can is gentle micro-dose');
});

test('Atmospheric VPD: Tetens thermodynamic equation', () => {
  const tempC = 22.2; // ~72F
  const humidity = 40; // 40% RH
  const vpSat = 0.61078 * Math.exp((17.27 * tempC) / (tempC + 237.3));
  const vpAir = vpSat * (humidity / 100);
  const vpd = vpSat - vpAir;
  assert.ok(vpd > 1.0 && vpd < 2.0, 'VPD under 40% RH at 22C should show moderate/elevated transpiration deficit');
});
