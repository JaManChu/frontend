function convertTime(time: string) {
    switch (time) {
        case 'FIVE_MINUTES':
            return '5분 이내';
        case 'TEN_MINUTES':
            return '10분 이내';
        case 'FIFTEEN_MINUTES':
            return '15분 이내';
        case 'TWENTY_MINUTES':
            return '20분 이내';
        case 'THIRTY_MINUTES':
            return '30분 이내';
        case 'SIXTY_MINUTES':
            return '60분 이내';
        case 'OVER_SIXTY_MINUTES':
            return '60분 이상';
        default:
            return time;
    }
}

function convertLevel(level: string) {
    switch (level) {
        case 'LOW':
            return '하';
        case 'MIDDLE':
            return '중';
        case 'HIGH':
            return '상';
        default:
            return level;
    }
}

export { convertTime, convertLevel };
