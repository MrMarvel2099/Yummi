"use strict"
let myHttp  = new XMLHttpRequest;
let dataList=[];
let categoryData = [];
let lightBoxContainer = document.querySelector("#lightBoxContainer");

    // Dynamic Section && Buttons


$("#menu").click(function(){
    $("#navBar").animate({left:'15%'},1200)
    $("#menuBar").animate({left:'0%'},900,function(){
        $("#menuDiv").animate({marginTop:'0%'},1000)
    })
    $("#menu").css("display","none")
    $("#exitMenu").css("display","block")
})

$("#exitMenu").click(function(){
    $("#navBar").animate({left:'0%'},900)
    $("#menuBar").animate({left:'-20%'},1200,function(){
        $("#menuDiv").animate({marginTop:'100%'},1000)
    })
    $("#menu").css("display","block")
    $("#exitMenu").css("display","none")
    })

$("#search").click(function(){
    $("#serachForm").css("visibility","visible")
    $("#navBar").animate({left:'0%'},900)
    $("#menuBar").animate({left:'-20%'},1200,function(){
        $("#menuDiv").animate({marginTop:'100%'},1000)
    })
    $("#menu").css("display","block");
    $("#exitMenu").css("display","none");
    $("#displayItems").css("display","none");
})

$("#contact").click(function(){
    $("#contactSection").css("display","block");
    $("#navBar").animate({left:'0%'},900)
    $("#menuBar").animate({left:'-20%'},1200,function(){
        $("#menuDiv").animate({marginTop:'100%'},1000)
    })
    $("#menu").css("display","block");
    $("#exitMenu").css("display","none");
    $("#displayItems").css("display","none");
})

$("#category").click(function(){
    $("#displayCategory").css("display","block")
    $("#navBar").animate({left:'0%'},900)
    $("#menuBar").animate({left:'-20%'},1200,function(){
        $("#menuDiv").animate({marginTop:'100%'},1000)
    })
    $("#menu").css("display","block");
    $("#exitMenu").css("display","none");
    $("#displayItems").css("display","none");
})



async function getMeals(){
    let getData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let myData = await getData.json();
    let meals = myData.meals
    dataList = meals
    console.log(meals);
    let cartona =``;
    for (let i = 0; i < meals.length; i++) {
        cartona += `
            <div class="col-md-6 col-lg-3">
                <div class="itemImg position-relative">
                    <img src="${meals[i].strMealThumb}" class="w-100" alt="${i}">
                    <div class="imgLayer px-5">
                        <h1 class="fw-light" id="mealName">${meals[i].strMeal}</h1>
                    </div>
                </div>
            </div>
        `
        document.getElementById("displayItems").innerHTML = cartona
    }
    console.log(myData);
}

async function getCategory(){
    let getCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let myCate = await getCategory.json();
    let category = myCate.categories
    categoryData = category
    console.log(category);
    let cateCartona =``
    for (let i = 0; i < category.length; i++) {
        cateCartona += `
            <div class="col-4">
                <div class="itemImg position-relative">
                    <img src="${category[i].strCategoryThumb}" class="w-100" alt="${i}">
                    <div class="cateLayer flex-column px-5">
                        <h1 class="fw-light" id="cateName">${category[i].strCategory}</h1>
                        <p class="fw-light" id="cateDiscrib">${category[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
        `
        document.getElementById("displayCategory").innerHTML = cateCartona
    }
}

// async function getArea(){
//     let getArea = await fetch(`https://www.themealdb.com/api/json/v1/1/.php`)
//     let myArea = await getArea.json();
//     let Area = myArea
//     console.log(Area);
// }

function flappingMeals(){
    return new Promise(function(){
        let imgLayer = document.querySelectorAll(".imgLayer")
        $(".imgLayer").parent().click(function(e){
            $(imgLayer).siblings().attr("src")
            let target = e.currentTarget.innerHTML
            console.log($(target));
            console.log(e.currentTarget)
            $("#mealTitle").html(e.currentTarget.innerText)
            $("#mainImg").attr("src",$(target).siblings().attr("src"));
            $("#mainImg").attr("alt",$(target).siblings().attr("alt"));
            $("#lightBoxContainer").css("display","flex");
            $("#displayItems").css("display","none");
            let index = Number ($("#mainImg").attr("alt"))
            console.log(index);
            $("#instructions").html(dataList[index].strInstructions)
            $("#areaText").html(dataList[index].strArea)
            $("#categoryText").html(dataList[index].strCategory)
            let recipCartona =``
            for (let i = 0; i < dataList.length; i++) {
                recipCartona += `
                <div class="col-md-4">
                <h5><span class="badge bg-success">${dataList[i].strIngredient1}</span></h5>
                </div>
                `
                document.getElementById("recipes").innerHTML= recipCartona
            }
            let tagsList = dataList[index].strTags.split(" ")
            let tagsCartona =``
            for (let i = 0; i < tagsList.length; i++) {
                tagsCartona +=`
                <h5><span class="badge bg-danger tags">${tagsList[i]}</span></h5>
                `
            }
            document.getElementById("tags").innerHTML=tagsCartona;
            console.log(tagsList);
        })
    })
}

async function loading(){
    await getCategory();
    await getMeals(); 
    // await getArea();
    await flappingMeals();

}

loading();
