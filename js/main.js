//******************************************Fetch*****************************************************//
var allPosts = []


if (allPosts.length == 0) {
    allPosts = JSON.parse(localStorage.getItem('x'))
    // console.log(allPosts)
    display()
}

async function getData() {
    let data = await fetch('https://jsonplaceholder.typicode.com/posts')
    let convert = await data.json()
    allPosts = convert
    // console.log(allPosts)
    localStorage.setItem('x', JSON.stringify(allPosts))
}


//******************************************Display Function*****************************************************//
function display() {
    var box = ``
    for (var i = 0; i < allPosts.length; i++) {
        box += `
        <div class="col-md-12 mt-5">
           <div class="posts card p-3">
           <h3 onclick="Update(${i},'id')">ID is:-${allPosts[i].id}</h3>
           <h5 onclick="Update(${i},'title')">Title is:-${allPosts[i].title}</h5>
           <p onclick="Update(${i},'body')">Body is:-${allPosts[i].body}</p>
           <div class="part">
           <button onclick="displayedit()" class="btn btn-warning addtions w-25">Update</button>
           <button onclick="Delete(${i})" class="btn btn-danger addtions w-25">Delete</button>
           </div>
           </div>
        </div>
        `
    }
    document.getElementById('demo').innerHTML = box
    document.getElementById('inner').innerHTML = "Number Of Posts is:" + allPosts.length

}


//******************************************Delete Function*****************************************************//
function Delete(index1) {
    allPosts.splice(index1, 1)
    display()
    localStorage.setItem('x', JSON.stringify(allPosts))
}


//******************************************Update Function*****************************************************//
function displayedit() {
    document.getElementById('edit').style.display = "block"
}

function Update(index, key) {
    var newword = document.getElementById('newData').value
    allPosts[index][key] = newword
    display()
    localStorage.setItem('x', JSON.stringify(allPosts))

}

//******************************************Reset Function*****************************************************//
async function Reset() {
    let data = await fetch('https://jsonplaceholder.typicode.com/posts')
    let convert = await data.json()
    allPosts = convert
    display()
}

//******************************************Add Function*****************************************************//
function displayAdd() {
    document.getElementById('bigdiv').style.display = "block"
}

function getData1() {
    const idarr = allPosts.map((post) => {
        return +post.id
    })
    // console.log(Math.max(...idarr))
    let maxnumber = Math.max(...idarr)
    console.log(maxnumber)

    var userId = document.getElementById('userid')
    var title = document.getElementById('title')
    var body = document.getElementById('body')
    var card = {
        userId:userId,
        id: maxnumber+1,
        title: title.value,
        body: body.value,
    }
    allPosts.push(card)

}
function Add() {
    getData1()
    document.getElementById('bigdiv').style.display = "none"
    var newcard = ``
    for (var j = 0; j < allPosts.length; j++) {
        newcard += `
        <div class="col-md-12 mt-5">
           <div class="posts card p-3">
           <h3>${allPosts[j].userId}</h3>
           <h3>${allPosts[j].id}</h3>
           <h5>${allPosts[j].title}</h5>
           <p>${allPosts[j].body}</p>
           <div class="part">
           <button class="btn btn-warning addtions w-25">Update</button>
           <button class="btn btn-danger addtions w-25 ">Delete</button>
           </div>
           </div>
        </div>
        `
    }
    document.getElementById('demo').innerHTML = newcard
    display()
    localStorage.setItem('x', JSON.stringify(allPosts))
    console.log(allPosts)
}


getData()
