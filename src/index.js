console.log('Write your code here');
fetch("http://localhost:3000/current-exhibits")
    .then((resp) => resp.json())
    .then((exhibitItems = []) => {
        renderExhibit(exhibitItems[0]);
    })


function renderExhibit(exhibit){
    const titlePlaceholder = document.querySelector("#exhibit-title");
    titlePlaceholder.textContent = exhibit.title;
    const boughtTickets = document.querySelector("#tickets-bought");
    boughtTickets.textContent = `${exhibit.tickets_bought} Tickets Bought`;
    const exhibitDescription = document.querySelector("#exhibit-description");
    exhibitDescription.textContent = exhibit.description;
    const exhibitImagePlaceholder = document.querySelector("#exhibit-image");
    exhibitImagePlaceholder.src = exhibit.image;
    const commentSection = document.querySelector("#comments-section");
    for(comment of exhibit.comments){
        const insertComment = document.createElement("p");
        insertComment.textContent = comment;
        commentSection.append(insertComment);
    }

    const commentForm = document.querySelector("#comment-form");
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newCommentText = document.querySelector("input[name='comment-input']");
        const newComment = document.createElement("p");
        newComment.textContent = newCommentText.value;
        commentSection.append(newComment);
        e.target.reset()
    })

    const ticketButton = document.querySelector("#buy-tickets-button");
    ticketButton.addEventListener("click", (e) =>{
        boughtTickets.textContent = handleTicketText(boughtTickets.textContent);
    })
}

function handleTicketText(ticketText){
    const splitText = ticketText.split(" ");
    const ticketCount = parseInt(splitText[0]) + 1;
    return `${ticketCount} Tickets Bought`;
}