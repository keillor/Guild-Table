/**
 * Calculates ability score modifiers if provided with raw ability score.
 * @param value A raw ability score number. Probably provided by a character.
 */
export default function as_mod_calc(value: number) {
    if (value == null) {
        return null;
    }
    return Math.floor((value-10)/2);
    
}