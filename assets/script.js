$(document).ready(function () {
  $(".slider-main").slick({
    slidesToShow: 1,
    arrows: true,
    infinite: false,
    prevArrow:
      '<img class="arrow_left arrow_commen" src="https://cdn.shopify.com/s/files/1/1979/4109/files/chevron-left_2.svg?v=1692912421" />',
    nextArrow:
      '<img class="arrow_right arrow_commen" src="https://cdn.shopify.com/s/files/1/1979/4109/files/chevron-right_2.svg?v=1692912421" />',
    asNavFor: ".slider-nav",
  });

  $(".slider-nav").slick({
    slidesToShow: 5,
    asNavFor: ".slider-main",
    vertical: true,
    focusOnSelect: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 1268,
        settings: {
          vertical: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          vertical: true,
          verticalSwiping: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  });

  $(".carousel").slick({
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          vertical: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  });
});

let accHeading = document.querySelectorAll(".accordion");
let accPanel = document.querySelectorAll(".accordion-panel");

for (let i = 0; i < accHeading.length; i++) {
  accHeading[i].onclick = function () {
    if (this.nextElementSibling.style.maxHeight) {
      hidePanels();
    } else {
      showPanel(this);
    }
  };
}

function showPanel(elem) {
  hidePanels();
  elem.classList.add("active");
  elem.nextElementSibling.style.maxHeight =
    elem.nextElementSibling.scrollHeight + "px";
}

function hidePanels() {
  for (let i = 0; i < accPanel.length; i++) {
    accPanel[i].style.maxHeight = null;
    accHeading[i].classList.remove("active");
  }
}

// Handle Variant Image on Page Load

window.addEventListener("load", () => {
  let selectNoJS = document.querySelector(".main-product-wrapper .no-js");
  let selectedIndex = selectNoJS.selectedIndex;
  let selectedOption = selectNoJS.options[selectedIndex];
  let getImgId = selectedOption.getAttribute("data-imageid");
  handleVariantImageChange(getImgId);
});

let decrement = document.querySelector(".minus_selector");
let increment = document.querySelector(".plus_selector");
let qtySelector = document.querySelector(".qty_selector");
let curVal = Number(qtySelector.value);
increment.addEventListener("click", () => {
  curVal++;
  qtySelector.value = curVal;
  updateButtonState(curVal);
});

decrement.addEventListener("click", () => {
  if (curVal > 1) {
    curVal--;
    qtySelector.value = curVal;
    updateButtonState(curVal);
  }
});
function updateButtonState(quantity) {
  if (quantity === 1) {
    decrement.classList.add("disabled");
  } else {
    decrement.classList.remove("disabled");
  }
}

document
  .querySelectorAll(".variant_wrapper .variant_selector")
  .forEach((variant) => {
    variant.querySelector("label").addEventListener("click", () => {
      let variantName = variant
        .querySelector("input")
        .getAttribute("acutalname");

      handleSelectedVariant(variantName);
    });
  });

function handleSelectedVariant(variantName) {
  document
    .querySelectorAll(".product-single__variants > option")
    .forEach(function (option) {
      if (option.text === variantName) {
        option.selected = true;
        let variantNewPrice = option.getAttribute("data-variantnewprice");
        let variantOldPrice = option.getAttribute("data-variantoldprice");
        let variantId = option.value;
        handleSelectVariantShow(variantNewPrice, variantOldPrice, variantName);

        let varImageId = option.getAttribute("data-imageid");
        handleVariantImageChange(varImageId);
      }
    });
}

function handleVariantImageChange(imgId) {
  let slide_index = $(".main-product-wrapper .slider-main ." + imgId).attr(
    "data-slick-index"
  );

  $(".main-product-wrapper .slider-main").slick("slickGoTo", slide_index);
}

function handleSelectVariantShow(
  variantNewPrice,
  variantOldPrice,
  variantName
) {
  document.querySelector(".variant_title_selector").innerHTML = variantName;

  const varNewPrice = document.querySelector(
    ".blacknwhitw-btn .discounted_price"
  );
  if (varNewPrice) {
    varNewPrice.innerHTML = variantNewPrice;
  }

  const actualPrice = document.querySelector(
    ".blacknwhitw-btn .actual_price small"
  );
  if (actualPrice) {
    actualPrice.innerHTML = variantOldPrice;
  }

  const originalPrice = document.querySelector(".original_price");
  if (originalPrice) {
    originalPrice.innerHTML = variantNewPrice;
  }
}
