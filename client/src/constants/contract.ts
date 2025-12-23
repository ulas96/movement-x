export const CONTRACT_ADDRESS =
  '0x84d32d22f8590bf5e25f5ecde004f1522407ae0d2ae5a80816453c61cf6f01cb';

export const FUNCTIONS = {
  IS_REGISTERED: `${CONTRACT_ADDRESS}::movement_x::is_registered`,
  GET_USER_NAME: `${CONTRACT_ADDRESS}::movement_x::get_user_name`,
  GET_USER_POSTS: `${CONTRACT_ADDRESS}::movement_x::get_user_posts`,
  REGISTER: `${CONTRACT_ADDRESS}::movement_x::register`,
  POST: `${CONTRACT_ADDRESS}::movement_x::post`,
} as const;
