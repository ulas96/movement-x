module movement_x_addr::movement_x {
  use std::string::{String};
  use std::signer;
  use std::vector;
  use aptos_framework::timestamp;  

  const EUSER_ALREADY_REGISTERED: u64 = 1;
  const EUSER_NOT_REGISTERED: u64 = 2;

  struct User has key, store, copy {
    address: address,
    name: String,
    posts: vector<Post>
  }

  struct Post has store, drop, copy{
    author: address,
    content: String,
    timestamp: u64,
  }

  #[view]
  public fun signature() : address {
    @movement_x_addr
  }

  #[view]
  public fun is_registered(user_addr: address): bool {
    exists<User>(user_addr)
  }

  #[view]
  public fun get_user_name(user_addr: address): String acquires User {
    assert!(is_registered(user_addr), EUSER_NOT_REGISTERED);
    let user = borrow_global<User>(user_addr);
    user.name
  }

  #[view]
  public fun get_user_posts(user_addr: address): vector<Post> acquires User {
    assert!(is_registered(user_addr), EUSER_NOT_REGISTERED);
    let user = borrow_global<User>(user_addr);
    user.posts
  }

  public entry fun register(account: &signer, name: String) {
    if (is_registered(signer::address_of(account))) abort EUSER_ALREADY_REGISTERED;

    let user = User {
    address: signer::address_of(account),
    name,
    posts: vector::empty<Post>()
    };

    move_to<User>(account, user);
  }

  public entry fun post(account: &signer, content: String) acquires User  {
  assert!(is_registered(signer::address_of(account)), EUSER_NOT_REGISTERED);

  let post = Post {
    author: signer::address_of(account),
    content,
    timestamp: timestamp::now_seconds(),
  };

  let user = borrow_global_mut<User>(signer::address_of(account));
  vector::push_back(&mut user.posts, post);
  }

}
