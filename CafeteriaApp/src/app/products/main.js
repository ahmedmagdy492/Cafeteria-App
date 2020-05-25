let item = JSON.parse(localStorage.getItem("userInfo"));
item.role = "Admin";
item = JSON.stringify(item);
localStorage.setItem('userInfo', item);