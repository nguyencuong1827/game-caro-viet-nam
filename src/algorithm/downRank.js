import rankConstants from "../constants/rank-constants";

function downRank(rank){
    switch(rank){
        case rankConstants.BRONZE:{
            return rankConstants.BRONZE;
        }
        case rankConstants.SILVER: {
            return rankConstants.BRONZE;
        }
        case rankConstants.GOLD: {
            return rankConstants.SILVER;
        }
        case rankConstants.PLATINUM: {
            return rankConstants.GOLD;
        }
        case rankConstants.DIAMOND: {
            return rankConstants.PLATINUM;
        }
        case rankConstants.MASTER: {
            return rankConstants.PLATINUM;
        }
        case rankConstants.GRAND_MASTER: {
            return rankConstants.MASTER;
        }
        case rankConstants.CHALLENGER: {
            return rankConstants.GRAND_MASTER;
        }
        default:{
            return 0;
        }

    }
}
export default downRank;