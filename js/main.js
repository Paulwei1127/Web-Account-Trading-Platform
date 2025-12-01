(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
        });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Team carousel
    $(".team-carousel, .related-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });
    
})(jQuery);



////----------------------------login/out function-----------------------
function show_hide() {
    var login = document.getElementById("container1");
    var signup = document.getElementById("container2");
  
    if (login.style.display === "none") {
      login.style.display = "block";
      signup.style.display = "none";
    } else {
      login.style.display = "none";
      signup.style.display = "block";
      signup.style.visibility = "visible";
    }
}

function login(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var userJson = localStorage.getItem(username);
    if (!userJson) {
      alert("登入失敗:該用戶不存在");
      return;
    }

    var user = JSON.parse(userJson);

    if (user.password !== password) {
      alert("登入失敗:密碼錯誤");
      return;
    }


    // 做標記，表示已登入
    localStorage.setItem("isLoggedIn", "true");
    alert("登入成功");
    location.href = "index.html";

    // 修改按鍵為"Logout"
    var loginLink = document.getElementById("loginLink");
    if (loginLink) {
        loginLink.innerHTML = "Logout";
        loginLink.setAttribute("onclick", "logout(event)");
    }
    
}


function logout(event) {
    event.preventDefault();
    // 移除用戶登入狀態的標記
    localStorage.removeItem("isLoggedIn");
    location.href = "login.html";
}

//為了使login.html以外的html也吃得到登入狀態
window.onload = function() {
    var loginLink = document.getElementById("loginLink");

    // 檢查用戶是否登入
    if (localStorage.getItem("isLoggedIn") === "true") {
        // 如果已登入，修改按鍵的字
        loginLink.innerHTML = "Logout";
        loginLink.setAttribute("onclick", "logout(event)");
    } else {
        // 未登入下確保正確
        loginLink.innerHTML = "Login";
        loginLink.setAttribute("href", "login.html");
        loginLink.removeAttribute("onclick");
    }
};



function register(event) {
    event.preventDefault();

    var fullname = document.getElementById("fullname").value;
    var username = document.getElementById("username2").value;
    var password = document.getElementById("password2").value;
    var confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
      alert("密碼與確認密碼不同");
      return;
    }

    if (localStorage.getItem(username)) {
      alert("該用戶名已被註冊");
      return;
    }

    var newUser = {
      fullname: fullname,
      username: username,
      password: password
    };

    localStorage.setItem(username, JSON.stringify(newUser));
  
    alert("註冊成功");
    location.href = "login.html";
}

function cleardata(event) {
    localStorage.clear();
    alert("資料已全數刪除");
    return;
}



/////--------------商品新增&刪除-----------------------
// 處理圖片上傳
function handleImageUpload(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
  
        reader.onloadend = function() {
            resolve(reader.result);
        }
  
        reader.onerror = reject;
  
        if (file) {
            reader.readAsDataURL(file);
        } else {
            reject();
        }
    });
}

// 管理商品
async function ManagePro(ProName, ProPrice, imageFile) {
    console.log("ManagePro is called with name: " + ProName + " and price: " + ProPrice);
    var products = JSON.parse(localStorage.getItem('product'));

    // Check if products is null
    if (!products) {
        products = [];
    }

    try {
        var ProImage = await handleImageUpload(imageFile);
  
        // 建立新的商品物件
        var newPro = {
            ProName: ProName,
            ProPrice: ProPrice,
            ProImage: ProImage
        };

        // 建立新選項元素
    var optionElement = document.createElement('option');

    optionElement.text = newPro.ProName;

    // 將新選項添加到select元素中
    var selectElement = document.getElementById('productSelect');
    selectElement.appendChild(optionElement);
        
  
        // 將新商品添加到清單
        products.push(newPro);
  
        // 更新 localStorage 中的資料
        localStorage.setItem('product', JSON.stringify(products));
  
        displayLatestProducts();
  
        alert('商品新增成功');
    } catch (error) {
        console.error('Error with image upload:', error);
    }
}


// 顯示最新的商品
function displayLatestProducts() {
    var latestShowcaseContainer = document.getElementById("latestShowcaseContainer");
    latestShowcaseContainer.innerHTML = "";

    var allProducts = JSON.parse(localStorage.getItem('product'));

    for (var i = 0; i < allProducts.length; i++) {
        var product = allProducts[i];
        createShowcaseItem(product, latestShowcaseContainer);
    }
}


// 建立展示項目
function createShowcaseItem(product, container) {
    var showcaseItem = document.createElement("div");
    showcaseItem.className = "rent-item";

    var productImage = document.createElement("img");
    productImage.className = "img-fluid mb-4";
    productImage.src = product.ProImage;
    productImage.alt = "Product Image";

    var productName = document.createElement("h4");
    productName.className = "text-uppercase mb-4";
    productName.textContent = product.ProName;

    var productPrice = document.createElement("a");
    productPrice.className = "btn btn-primary px-3";
    productPrice.href = "#";
    productPrice.textContent = '$' + product.ProPrice;

    showcaseItem.appendChild(productImage);
    showcaseItem.appendChild(productName);
    showcaseItem.appendChild(productPrice);

    container.appendChild(showcaseItem);

    // 創建一個空的 div 作為間隔
    var divider = document.createElement("div");
    divider.style.height = "10px";
    container.appendChild(divider);
}


//更新價格
function UpdatePro(newProName, newProPrice) {
    var products = JSON.parse(localStorage.getItem('product'));

    // 找到要更新的對象
    for (var i = 0; i < products.length; i++) {
        if (products[i].ProName === newProName) {
            products[i].ProName = newProName || products[i].ProName;
            products[i].ProPrice = newProPrice || products[i].ProPrice;
            break;
        }
    }

    // 更新 localStorage 中的資料
    localStorage.setItem('product', JSON.stringify(products));

    // 重新顯示所有剩餘的商品
    displayLatestProducts();

    alert('商品價格更新成功');
}

//刪除
function DeletePro(ProName) {
    var products = JSON.parse(localStorage.getItem('product'));

    var selectElement = document.getElementById('productSelect');

    // 尋找並刪除對應的選項
    for(var i = 0; i < selectElement.options.length; i++) {
        if(selectElement.options[i].text == ProName) {
            selectElement.remove(i);
            break;
        }
    }
    
    // 找到要刪除的商品
    for (var i = 0; i < products.length; i++) {
        if (products[i].ProName === ProName) {
            products.splice(i, 1);
            break;
        }
    }

    // 更新 localStorage 中的資料
    localStorage.setItem('product', JSON.stringify(products));
    
    // 重新顯示所有剩餘的商品
    displayLatestProducts();

    alert('商品刪除成功');
}

//alert輸出訂單資訊
document.getElementById('reserveNow').addEventListener('click', function() {
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    var gameAccountElement = document.getElementById('productSelect');
    var gameAccount = gameAccountElement.options[gameAccountElement.selectedIndex].text;  // 取得選擇的遊戲帳號


    var cityElement = document.getElementById('city');
    var city = cityElement.options[cityElement.selectedIndex].text;  // 取得選擇的縣市名稱

    var address = city + document.getElementById('address').value;  // 將縣市名稱與地址結合
    var note = document.getElementById('note').value;

    var payment;
    if (document.getElementById('credit_card').checked) {
        payment = '信用卡';
    } else if (document.getElementById('mobile_payment').checked) {
        payment = '行動支付';
    } else if (document.getElementById('banktransfer').checked) {
        payment = '銀行轉帳';
    }

    var msg = `訂單資訊\n訂購人姓名: ${firstname} ${lastname}\n選擇購買的帳號: ${gameAccount}\nEmail: ${email}\n手機號碼: ${phone}\n付款方式: ${payment}\n地址: ${address}\n備註: ${note}`;
    alert(msg);
});

