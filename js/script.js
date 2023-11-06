const handleInsertMenu = async () => {
    const inputTitle = document.getElementById("inputTitle")
    const inputAuthor = document.getElementById("inputAuthor")
    const inputSummary = document.getElementById("inputSummary")
    const inputPublisher = document.getElementById("inputPublisher")
    console.log(inputTitle);
    const resp = await fetch("http://localhost:7070/api/books",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(
            {
                "title" : inputTitle.value,
                "author" : inputAuthor.value,
                "summary" : inputSummary.value,
                "publisher" : inputPublisher.value
            }
        )
    });
    location.reload()
}

const handleActionEdit = (elementId) => {
    console.log(elementId) // row-id-1
    const el = document.getElementById(elementId)
    const inputTitle = document.getElementById("inputTitle")
    const inputAuthor = document.getElementById("inputAuthor")
    const inputSummary = document.getElementById("inputSummary")
    const inputPublisher = document.getElementById("inputPublisher")

    inputTitle.value = el.children[0].innerText
    inputAuthor.value = el.children[1].innerText
    inputSummary.value = el.children[2].innerText
    inputPublisher.value = el.children[3].innerText

    document.getElementById("buttonInsert").disabled = true;
    document.getElementById("buttonEdit").disabled = false;

    let menuId = elementId.split('-')[2]
    console.log(menuId)
    document.getElementById("buttonEdit").onclick = () => { handleSubmitEdit(menuId) }
}

const handleSubmitEdit = async (menuId)=>{
    const inputTitle = document.getElementById("inputTitle")
    const inputAuthor = document.getElementById("inputAuthor")
    const inputSummary = document.getElementById("inputSummary")
    const inputPublisher = document.getElementById("inputPublisher")
    // console.log(menuId)
    // console.log(inputTitle)
    const resp = await fetch(`http://localhost:7070/api/books/${menuId}`, {
        method : 'PUT',
        headers : {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title" : inputTitle.value,
            "author" : inputAuthor.value,
            "summary" : inputSummary.value,
            "publisher" : inputPublisher .value
        })
    })
    location.reload()
}

const handleDelete = async (menuId)=>{
    const confirmation = confirm('anda yakin?')
    if (confirmation){
        const resp = await fetch(`http://127.0.0.1:7070/api/books/${menuId}`,{
            method : 'DELETE'
        }) 
        location.reload()
    }
}

