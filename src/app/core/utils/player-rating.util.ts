import { Player } from '../models/player.model';

// Map formation positions to JSON field names
const POSITION_MAP: Record<string, string> = {
    'GK': 'gk',
    'LB': 'lb', 'RB': 'rb',
    'LCB': 'lcb', 'CB': 'cb', 'RCB': 'rcb',
    'LWB': 'lwb', 'RWB': 'rwb',
    'LDM': 'ldm', 'CDM': 'cdm', 'RDM': 'rdm',
    'LM': 'lm', 'RM': 'rm',
    'LCM': 'lcm', 'CM': 'cm', 'RCM': 'rcm',
    'LAM': 'lam', 'CAM': 'cam', 'RAM': 'ram',
    'LW': 'lw', 'RW': 'rw',
    'LF': 'lf', 'CF': 'cf', 'RF': 'rf',
    'LS': 'ls', 'ST': 'st', 'RS': 'rs',
};

// Parse rating string like "89+3" and return base rating
function parseRating(ratingStr: string | number | undefined): number {
    if (!ratingStr) return 0;
    const str = String(ratingStr);
    const match = str.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
}

export function getPositionRating(player: Player, position: string): number {
    // Get the JSON field name for this position
    const fieldName = POSITION_MAP[position.toUpperCase()];

    if (!fieldName) {
        return player.overall; // Fallback to overall if position not found
    }

    // For GK, check if player has GK stats
    if (fieldName === 'gk') {
        const gkDiving = parseRating(player.gk_diving);
        if (gkDiving > 0) {
            // Average of GK stats
            const gkHandling = parseRating(player.gk_handling);
            const gkKicking = parseRating(player.gk_kicking);
            const gkReflexes = parseRating(player.gk_reflexes);
            const gkPositioning = parseRating(player.gk_positioning);
            return Math.round((gkDiving + gkHandling + gkKicking + gkReflexes + gkPositioning) / 5);
        }
        return 0; // Non-GK player in GK position shows 0
    }

    // Get position rating from player data
    const posRating = player[fieldName];
    if (posRating) {
        return parseRating(posRating);
    }

    return player.overall; // Fallback
}

export function getRatingColor(rating: number): string {
    if (rating >= 85) return 'from-yellow-400 to-yellow-600'; // Gold
    if (rating >= 75) return 'from-green-400 to-green-600';   // Green
    if (rating >= 65) return 'from-blue-400 to-blue-600';     // Blue
    return 'from-gray-400 to-gray-600';                       // Silver
}

export function formatValue(value: number): string {
    if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `€${(value / 1000).toFixed(0)}K`;
    return `€${value}`;
}

export function formatWage(wage: number): string {
    if (wage >= 1000) return `€${(wage / 1000).toFixed(0)}K/wk`;
    return `€${wage}/wk`;
}
