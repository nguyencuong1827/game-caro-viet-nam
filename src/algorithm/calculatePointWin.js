import rankConstants from "../constants/rank-constants";

function changeToNumber(rank){
    switch(rank){
        case rankConstants.BRONZE:{
            return 1;
        }
        case rankConstants.SILVER: {
            return 2;
        }
        case rankConstants.GOLD: {
            return 3;
        }
        case rankConstants.PLATINUM: {
            return 4;
        }
        case rankConstants.DIAMOND: {
            return 5;
        }
        case rankConstants.MASTER: {
            return 6;
        }
        case rankConstants.GRAND_MASTER: {
            return 7;
        }
        case rankConstants.CHALLENGER: {
            return 8;
        }
        default:{
            return 0;
        }

    }
}


export default function calculatePointWin(rankUserWin, rankUserLose){
    const rankNumberWin = changeToNumber(rankUserWin);
    const rankNumberLose = changeToNumber(rankUserLose);
    if(rankNumberWin === rankNumberLose){
        return 5;
    }
    return rankNumberLose * 5;
}