import {
  POST_CATEGORY,
  TOKEN,
  USER,
  UPDATE,
  IS_TOKEN_EXP,
  IS_PAYMENT,
  MODEL_SHOW,
  CREDIT_ID,
  NOTIFICATION,
  FROM,
  PRICE,
  CLEAR,
  TAGS,
  UNCHECK,
  CATEGORY,
  ALL_CLEAR,
  FOLLOWING,
  VOUCHED,
  ALERT,
  SHOWSIDEBARITEM,
  SORT_FILTER,
  APPLIED_AUCTION_KEY,
  VIEW_AUCTION_TAB_KEY,
  AUCTION_DETAIL,
} from "../../actions/app/appActions";

const initialState = {
  postCat: "Feed",
  token: "",
  user: [],
  update: false,
  isExpired: false,
  payment: true,
  modalShow: false,
  creditId: "",
  chatUpdate: false,
  notifications: [],
  from: "",
  price: undefined,
  category: "",
  Tags: [],
  clear: false,
  following: false,
  vouched: "test",
  showSidebarItem: "accountSetting",
  sortFilter: "",
  appliedAuctionKey: "applied",
  viewAuctionTabKey: "sellcar",
  auctionEndTabKey: "tradecar",
  acution_detail: [],
  alert: { showAlert: false, alertMessage: "", alertType: "Success" },
};
const app = (state = initialState, action) => {
  switch (action.type) {
    case POST_CATEGORY:
      return {
        ...state,
        postCat: action.value,
      };
    case TOKEN:
      return {
        ...state,
        token: action.value,
      };
    case USER:
      return {
        ...state,
        user: action.value,
      };
    case ALERT:
      return {
        ...state,
        alert: action.alert,
      };
    case UPDATE:
      return {
        ...state,
        update: action.value,
      };
    case IS_PAYMENT:
      return {
        ...state,
        payment: action.value,
      };
    case MODEL_SHOW:
      return {
        ...state,
        modalShow: action.value,
      };
    case IS_TOKEN_EXP:
      const session = JSON.parse(window.sessionStorage.getItem("sessionToken"));
      return {
        ...state,
        isExpired: session,
      };
    case CREDIT_ID:
      return {
        ...state,
        creditId: action.value,
      };
    case NOTIFICATION:
      return {
        ...state,
        notifications: action.value,
      };
    case FROM:
      return {
        ...state,
        from: action.value,
      };
    case PRICE:
      return {
        ...state,
        price: action.value,
        clear: true,
      };
    case CLEAR:
      return {
        ...state,
        price: undefined,
        category: undefined,
        Tags: [],
        clear: false,
      };
    case CATEGORY:
      return {
        ...state,
        category: action.value,
        clear: true,
      };
    case TAGS:
      return {
        ...state,
        Tags: [...state.Tags, action.value],
        clear: true,
      };
    case UNCHECK:
      return {
        ...state,
        Tags: state.Tags.filter((item) => item !== action.value),
        clear: true,
      };
    case FOLLOWING:
      return {
        ...state,
        following: action.value,
      };
    case VOUCHED:
      return {
        ...state,
        vouched: action.value,
      };
    case SORT_FILTER:
      return {
        ...state,
        sortFilter: action.value,
      };
    case SHOWSIDEBARITEM:
      return {
        ...state,
        showSidebarItem: action.value,
      };
    case APPLIED_AUCTION_KEY:
      return {
        ...state,
        appliedAuctionKey: action.value,
      };
    case VIEW_AUCTION_TAB_KEY:
      return {
        ...state,
        viewAuctionTabKey: action.value,
      };
    case AUCTION_DETAIL:
      return {
        ...state,
        acution_detail: action.value,
      };

    case ALL_CLEAR:
      return initialState;
    default:
      return state;
  }
};
export default app;
