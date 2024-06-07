import { defineStore } from "pinia";

export const useUserStore = defineStore("user", function () {
  const user = ref();
  const token = useCookie("my_token", {
    maxAge: 60 * 30,
  });
  const currentBillToken = useCookie("bill_token", {
    maxAge: 60 * 30,
  });
  const cart = ref();

  const setToken = (data?: number) => (token.value = data);

  const setBillToken = (data?: number) => (currentBillToken.value = data);

  const setUser = (data?: any) => (user.value = data);

  const setCart = (data?: any) => (cart.value = data);

  const signIn = async (data: any) => {
    try {
      const response = await $fetch("http://localhost:3001/userlogin", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setToken(response.id);
      await fetchCustomer();
      await fetchCart();
    } catch (error) {
      setToken();
      setUser();
      setCart();
      console.log(error);
    }
  };
  const signUp = async (data: any) => {
    try {
      const response = await $fetch("http://localhost:3001/usersignup", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.access == false) {
        alert("Tài khoản đã tồn tại!");
        return false;
      }
      setToken(response.id.MaKhachHang);
      await fetchCustomer();
    } catch (error) {
      setToken();
      setUser();
      console.log(error);
    }
  };
  const fetchCustomer = async () => {
    if (token.value) {
      try {
        const response = await $fetch(
          `http://localhost:3001/user/${token.value}`
        );
        setUser(response);
      } catch (error) {}
    }
  };
  const logOut = () => {
    setToken();
    setUser();
  };

  const fetchCart = async () => {
    if (token.value) {
      try {
        const response = await $fetch(
          `http://localhost:3001/user/cart/${token.value}`
        );
        setCart(response);
        console.log(cart);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addToCart = async (data: any) => {
    try {
      const response = await $fetch(
        `http://localhost:3001/user/cart/${token.value}`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      setCart(response);
      await fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    token,
    cart,
    currentBillToken,
    logOut,
    signIn,
    signUp,
    fetchCustomer,
    setToken,
    setUser,
    setCart,
    setBillToken,
    fetchCart,
    addToCart,
  };
});
