import rankConstants from "../constants/rank-constants";

function upRank(currRank){
    switch(currRank){
        case rankConstants.BRONZE:{
            return rankConstants.SILVER;
        }
        case rankConstants.SILVER: {
            return rankConstants.GOLD;
        }
        case rankConstants.GOLD: {
            return rankConstants.PLATINUM;
        }
        case rankConstants.PLATINUM: {
            return rankConstants.DIAMOND;
        }
        case rankConstants.DIAMOND: {
            return rankConstants.MASTER;
        }
        case rankConstants.MASTER: {
            return rankConstants.GRAND_MASTER;
        }
        case rankConstants.GRAND_MASTER: {
            return rankConstants.CHALLENGER;
        }
        case rankConstants.CHALLENGER: {
            return rankConstants.CHALLENGER;
        }
        default:{
            return currRank;
        }

    }
}
export default upRank;