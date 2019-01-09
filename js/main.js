
const app = document.querySelector(".sp__device");
const displayTotalAmount = app.querySelector(".sp__display--total-amount");
const displayBillAmount = app.querySelector(".sp__display--bill-amount");
const displayNumberOfFriends = app.querySelector(".sp__display--friends");
const displayTipAmount = app.querySelector(".sp__display--tip-amount");
const displayTipPercentage = app.querySelector(".sp__display--tip-percentage");
const sliderDisplayNumberOffFriends = app.querySelector(".sp__friends-number")

const display = document.querySelector(".sp__display");
const friendsSlider = app.querySelector(".sp__friends-slider");
const tipKeys = app.querySelector(".sp__tip-keys");
const numberKeys = app.querySelector(".sp__number-keys");

const getKeyType = (key) => {
  const { action } = key.dataset
  if (!action) return 'number'
  if (action === "clear") return 'clear'
  return action
}

const createBillString = (key, displayNumber) => {
  const keyContent = key.textContent;
  const keyType = getKeyType(key)

  if (keyType === "clear") {
    return 0;
  }
  if (keyType === "add") {
    return displayNumber;;
  }
  if (keyType === "number") {
    if (displayNumber === "0") {
      return keyContent;
    }
    if (displayNumber !== "0") {
      if (displayNumber.length > 5) {
        return displayNumber;
      } else {
        return displayNumber + keyContent;
      }
    }
  }
};

const createTipsString = () => {
  const bill = parseFloat(display.querySelector(".sp__display--bill-amount")
    .textContent);
  const tip = parseFloat(display.querySelector(".sp__display--tip-percentage")
    .textContent
    .split("(").join(" ")
    .split("%)").join(" ")
    );
  return (bill * (tip / 100)).toFixed(0);
}

const createTotalString = _ => {
  const bill = parseFloat(displayBillAmount.textContent);
  const tip = parseFloat(displayTipAmount.textContent)
  const total = bill + bill * (tip / 100);
  return "$" + total.toFixed(0).toString();
};

const highlightSelectedKey = key => {
  Array.from(key.parentNode.children).forEach(k => {
    k.classList.remove("is-selected");
    }
  );
  key.classList.add("is-selected");
};

const updateFriendsNumbers = _ => {
  const friendsToBeAdded = friendsSlider.value - 2;
  displayNumberOfFriends.textContent = friendsSlider.value;
  sliderDisplayNumberOffFriends.textContent = friendsSlider.value;
  sliderDisplayNumberOffFriends.classList.add("run-push-animation");
  sliderDisplayNumberOffFriends.addEventListener("animationend", function() {sliderDisplayNumberOffFriends.classList.remove("run-push-animation");});
  updateFriendsIcons(friendsToBeAdded);
}

const updateFriendsIcons = (friends) => {
  const friendsContainer = app.querySelector(".sp__friends-icon-container")
  const dynamicFriendsElements = app.querySelectorAll(".dynamic");
  const friendsToBeRemoved = [...dynamicFriendsElements]

  friendsToBeRemoved.forEach(friend => {
    friendsContainer.removeChild(friend)
  })

  for (let index = 0; index < friends; index++) {
    const friendElement = `<img class="sp__friends-icon-small dynamic run-small-push-animation" src="img/small_user.svg" alt="Friends icon">`;
    friendsContainer.insertAdjacentHTML('beforeend', friendElement);
  }
}

tipKeys.addEventListener("click", e => {
  const targetButton = e.target.closest('button')
  if (targetButton) {
    const key = e.target.textContent;
    tip = parseFloat(key);
    displayTipPercentage.textContent = `(${key})`;
    displayTipAmount.textContent = createTipsString();
    highlightSelectedKey(e.target);
  }
});

numberKeys.addEventListener("click", e => {
  const key = e.target.closest("button")
  if (key) {
    const billAmount = displayBillAmount.textContent;
    displayBillAmount.textContent = createBillString(key, billAmount);
    displayTipAmount.textContent = createTipsString();
    displayTotalAmount.textContent = createTotalString();
    key.classList.add("run-push-animation");
  }
  key.addEventListener("animationend", function() {key.classList.remove("run-push-animation");});
});