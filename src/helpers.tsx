import bug from './icons/BugIC_Big.webp'
import dark from './icons/DarkIC_Big.webp'
import electric from './icons/ElectricIC_Big.webp'
import dragon from './icons/DragonIC_Big.webp'
import fairy from './icons/FairyIC_Big.webp'
import fighting from './icons/FightingIC_Big.webp'
import fire from './icons/FireIC_Big.webp'
import flying from './icons/FlyingIC_Big.webp'
import ghost from './icons/GhostIC_Big.webp'
import grass from './icons/GrassIC_Big.webp'
import ground from './icons/GroundIC_Big.webp'
import ice from './icons/IceIC_Big.webp'
import normal from './icons/NormalIC_Big.webp'
import poison from './icons/PoisonIC_Big.webp'
import psychic from './icons/PsychicIC_Big.webp'
import rock from './icons/RockIC_Big.webp'
import steel from './icons/SteelIC_Big.webp'
import water from './icons/WaterIC_Big.webp'

let types = new Map([
    ['bug', bug],
    ['dark', dark],
    ['dragon', dragon],
    ['electric', electric],
    ['fairy', fairy],
    ['fighting', fighting],
    ['fire', fire],
    ['flying', flying],
    ['ghost', ghost],
    ['grass', grass],
    ['ground', ground],
    ['ice', ice],
    ['normal', normal],
    ['poison', poison],
    ['psychic', psychic],
    ['rock', rock],
    ['steel', steel],
    ['water', water]
]);

const helpers = {
    getType : (key: string) => {
        return types.get(key)
    }
}

export default helpers
