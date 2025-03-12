const mainLink = document.querySelector(".main__open");
const menu = document.querySelector(".main__nav");

setHomePageCards();

mainLink.addEventListener("click", (e) => {

    e.preventDefault();
    menu.setAttribute("class", "main__nav--open");
    console.log("click");
}); 

const mainClose = document.querySelector(".main__close");

mainClose.addEventListener("click", () => {
    menu.setAttribute("class", "main__nav");
}); 

async function getAPI(){
    const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await response.json();

    data.challenges.forEach(console.log(data.challenges))

}

async function setHomePageCards(){
    const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await response.json();
    data.challenges.sort((a,b) =>b.rating - a.rating);
    const bookDiv=document.querySelector(".book__div");
    setCardInfo(0, data.challenges, bookDiv);
    setCardInfo(1, data.challenges, bookDiv);
    setCardInfo(2, data.challenges, bookDiv);
}

function setCardInfo(i, list, div){
    const bookDivRoom = document.createElement("div");
    div.appendChild(bookDivRoom);
    bookDivRoom.classList.add("book__div__room");

    const bookDivImg=document.createElement("img");
    bookDivRoom.appendChild(bookDivImg);
    bookDivImg.classList.add("book__div__img");
    bookDivImg.src=list[i].image;

    const bookDivTitel=document.createElement("h2");
    bookDivRoom.appendChild(bookDivTitel);
    bookDivTitel.classList.add("book__div__titel");
    bookDivTitel.innerHTML=list[i].title +" (" + list[i].type + ")";
    
    const bookDivParticipants=document.createElement("p");
    bookDivRoom.appendChild(bookDivParticipants);
    bookDivParticipants.classList.add("book__div__participants");
    bookDivParticipants.innerHTML=list[i].minParticipants + "-" + list[i].maxParticipants + " participants";
    
    const bookStars = document.createElement("div");
    bookDivRoom.appendChild(bookStars);
    bookStars.classList.add("book__stars");

    const bookStarOne=document.createElement("i");
    bookStars.appendChild(bookStarOne);
    bookStarOne.style.color="#E3170A";

    const bookStarTwo=document.createElement("i");
    bookStars.appendChild(bookStarTwo);
    bookStarTwo.style.color="#E3170A";

    const bookStarThree=document.createElement("i");
    bookStars.appendChild(bookStarThree);
    bookStarThree.style.color="#E3170A";

    const bookStarFour=document.createElement("i");
    bookStars.appendChild(bookStarFour);
    bookStarFour.style.color="#E3170A";

    const bookStarFive=document.createElement("i");
    bookStars.appendChild(bookStarFive);
    bookStarFive.style.color="#E3170A";

    switch(list[i].rating){
        case 5:
            bookStarOne.className="fa fa-star";
            bookStarTwo.className="fa fa-star";
            bookStarThree.className="fa fa-star";
            bookStarFour.className="fa fa-star";
            bookStarFive.className="fa fa-star";
        case 4.5:
            bookStarOne.className="fa fa-star";
            bookStarTwo.className="fa fa-star";
            bookStarThree.className="fa fa-star";
            bookStarFour.className="fa fa-star";
            bookStarFive.className="fa fa-star-half-stroke";
            break;
        case 4:
            bookStarOne.className="fa fa-star";
            bookStarTwo.className="fa fa-star";
            bookStarThree.className="fa fa-star";
            bookStarFour.className="fa fa-star";
            bookStarFive.className="fa-regular fa-star";
            break;
        case 3.5:
            bookStarOne.className="fa fa-star";
            bookStarTwo.className="fa fa-star";
            bookStarThree.className="fa fa-star";
            bookStarFour.className="fa fa-star-half-stroke";
            bookStarFive.className="fa-regular fa-star";
            break;
        case 3:
            bookStarOne.className="fa fa-star";
            bookStarTwo.className="fa fa-star";
            bookStarThree.className="fa fa-star";
            bookStarFour.className="fa-regular fa-star";
            bookStarFive.className="fa-regular fa-star";
            break;
        case 2.5:
            bookStarOne.className="fa fa-star";
            bookStarTwo.className="fa fa-star";
            bookStarThree.className="fa fa-star-half-stroke";
            bookStarFour.className="fa-regular fa-star";
            bookStarFive.className="fa-regular fa-star";
            break;
        case 2:
            bookStarOne.className="fa fa-star";
            bookStarTwo.className="fa fa-star";
            bookStarThree.className="fa-regular fa-star";
            bookStarFour.className="fa-regular fa-star";
            bookStarFive.className="fa-regular fa-star";
            break;
        case 1.5:
            bookStarOne.className="fa fa-star";
            bookStarTwo.className="fa fa-star-half-stroke";
            bookStarThree.className="fa-regular fa-star";
            bookStarFour.className="fa-regular fa-star";
            bookStarFive.className="fa-regular fa-star";
            break;
        case 1:
            bookStarOne.className="fa fa-star";
            bookStarTwo.className="fa-regular fa-star";
            bookStarThree.className="fa-regular fa-star";
            bookStarFour.className="fa-regular fa-star";
            bookStarFive.className="fa-regular fa-star";
            break;
        case 0.5:
            bookStarOne.className="fa fa-star-half-stroke";
            bookStarTwo.className="fa-regular fa-star";
            bookStarThree.className="fa-regular fa-star";
            bookStarFour.className="fa-regular fa-star";
            bookStarFive.className="fa-regular fa-star";
            break;
        case 0:
            bookStarOne.className="fa-regular fa-star";
            bookStarTwo.className="fa-regular fa-star";
            bookStarThree.className="fa-regular fa-star";
            bookStarFour.className="fa-regular fa-star";
            bookStarFive.className="fa-regular fa-star";
            break;
    }
    const bookDivText=document.createElement("p");
    bookDivRoom.appendChild(bookDivText);
    bookDivText.classList.add("book__div__text");
    const text = list[i].description;
    let shortenedText = "";
    if(text.length < 50){
        bookDivText.innerHTML=text;
    }else{
        if(text[49]!=" "){
            for(let i = 48; i > 0; i--){
                if(text[i]==" "){
                    shortenedTextext = text.slice(0,i) + "...";
                    break;
                }
            }
        }else if(text[49]==" "){
            shortenedText = challenge.description.slice(0,49);
        }
        bookDivText.innerHTML=shortenedText;
    }
    

    const redLink=document.createElement("a");
    bookDivRoom.appendChild(redLink);
    redLink.classList.add("red__link");
    if(list[i].type =="online"){
         redLink.innerHTML="Take challenge online";
    }else{
        redLink.innerHTML="Book room";
        redLink.addEventListener("click", () => {
            const showBook = document.querySelector(".bookingModal");
            showBook.style.display = "flex";
            bookingId = list[i].id;
            minPart = list[i].minParticipants;
            maxPart = list[i].maxParticipants;                               
            console.log(list[i].id);                
            console.log("delP", participants); 
           });
    }
}
