
createChallengesList();

export const challengesList = [];
export async function createChallengesList(){
    const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await response.json();
    challengesList.length = 0;    
    data.challenges.forEach((challenge) => {
        challengesList.push(challenge);
    });
    createRooms(challengesList);
}

export async function createRooms(list){
    const roomContainer = document.querySelector(".book__div")   
    roomContainer.innerHTML = "";
    list.forEach((challenge) => {
        const roomTile = document.createElement("div");
        roomTile.className = "book__div__room challenge";
        roomTile.setAttribute("data-type", challenge.type);
        roomTile.setAttribute("id", challenge.id);
        roomContainer.appendChild(roomTile);

        const roomName = document.createElement("h2");
        roomName.className = "book__div__titel";
        roomTile.appendChild(roomName);
        roomName.innerHTML = challenge.title + " (" + challenge.type + ")";
        
        const img = document.createElement("img");
        img.className = "book__div__img";
        img.src = challenge.image;
        roomTile.appendChild(img);

        const participants = document.createElement("p");
        participants.className = "book__div__participants"
        participants.innerHTML = challenge.minParticipants + "-" + challenge.maxParticipants + " participants"
        roomTile.appendChild(participants);

        const description = document.createElement("p");
        description.className = "book__div__text";
        let text = " ";
        if(challenge.description.length <= 50){
            description.innerHTML = challenge.description;
        }else{
            console.log(challenge.description[49]);
            if(challenge.description[49]!=" "){
                for(let i = 48; i > 0; i--){
                    if(challenge.description[i]==" "){
                        text = challenge.description.slice(0,i) + "...";
                        break;
                    }
                }
            }else if(challenge.description[49]==" "){
                text = challenge.description.slice(0,49);
            }
            description.innerHTML = text;
        }
        
        roomTile.appendChild(description);

        const bookBtn = document.createElement("a");
        bookBtn.className = "red__link"
        roomTile.appendChild(bookBtn);        
        bookBtn.style.marginRight= "10px";   

        if (challenge.type == "online"){
            bookBtn.innerHTML = "Take challenge online"
        } 
        else 
        {
            bookBtn.innerHTML = "Book this room"            
            bookBtn.addEventListener("click", () => {
                const showBook = document.querySelector(".bookingModal");
                showBook.style.display = "flex";
                bookingId = challenge.id;
                minPart = challenge.minParticipants;
                maxPart = challenge.maxParticipants;                               
               }); 
        }
        
    const bookStars = document.createElement("div");
    roomTile.appendChild(bookStars);
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

    switch(challenge.rating){
        case 5:
            bookStarOne.className="fa fa-star";
            bookStarTwo.className="fa fa-star";
            bookStarThree.className="fa fa-star";
            bookStarFour.className="fa fa-star";
            bookStarFive.className="fa fa-star";
            break;
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
    });
    window.challengesList = challengesList;
}

// Sorting functionality
document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("sort-select");

    createChallengesList().then(() => {
        sortSelect.value = "rating"; 
        applySorting("rating");
    });

    function applySorting(criterion) {
        if (criterion === "rating") {
            challengesList.sort((a, b) => b.rating - a.rating); 
        } else if (criterion === "name") {
            challengesList.sort((a, b) => a.title.localeCompare(b.title)); 
        }
        createRooms(challengesList);
    }

    sortSelect.addEventListener("change", (event) => {
        const selectedOption = event.target.value;
        applySorting(selectedOption);
    });
});
