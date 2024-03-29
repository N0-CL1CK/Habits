export function generatePercentage(total: number, completed: number): number {
    return total > 0 ? Math.round((completed/total)*100) : 0;
}