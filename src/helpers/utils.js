import rankConstants from "../constants/rank-constants";

export const convertRankNameImage = (rank) => {
  switch (rank) {
    case rankConstants.BRONZE:
      return 'bronze'
    case rankConstants.SILVER:
      return 'silver'
    case rankConstants.GOLD:
      return 'gold'
    case rankConstants.PLATINUM:
      return 'platinum'
    case rankConstants.DIAMOND:
      return 'diamond'
    case rankConstants.MASTER:
      return 'master'
    case rankConstants.GRAND_MASTER:
      return 'grand-master'
    case rankConstants.CHALLENGER:
      return 'challenger'
    default:
      return null
  }
}
