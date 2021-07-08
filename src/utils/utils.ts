export function getPercent(xp: number): number {
	let [level, nextLvl, thisLvl] = [0, 0, 0];

	while (nextLvl < xp) {
		nextLvl = (5 / 6) * level * (2 * level ** 2 + 27 * level + 91);
		level++;
	}

	thisLvl =
		(5 / 6) * (level - 2) * (2 * (level - 2) ** 2 + 27 * (level - 2) + 91);
	nextLvl =
		(5 / 6) * (level - 1) * (2 * (level - 1) ** 2 + 27 * (level - 1) + 91);

	return (xp - thisLvl) / (nextLvl - thisLvl);
}
