// let a = document.getElementsByTagName('ul'); // This returns an HTMLCollection
//we have to convert to array to apply foreach.
// console.log(a);
// adding HTML requires parsing which is a slow operation comparing with adding elements.
// a[0].insertAdjacentHTML("beforeend", `<li>a<button id='x'>X</button></li>`);

const items_list = document.querySelector('ul');
const clr_btn = document.querySelector('#clear');
const filter = document.querySelector('#filter');
const item_input = document.querySelector("#item-input");

let isEdit=false;

//creating element
function add_item(item)
{
    let a = document.getElementsByTagName('ul');
    const li = document.createElement('li');
    const bt = document.createElement('button');
    li.textContent = item;
    bt.textContent='X';
    bt.id = "x";
    li.append(bt);
    a[0].appendChild(li);
}


//In line Event Listener not recomended
function onClear(){
    alert('testing');
}

//JS Event Listeners
// btn.onclick = () => alert("test2");

//By using above two methods we can only add one functionality for onclick
//With Add Event Listener method we can have mutliple functions attached.
//In add even Listeners we have give the action and the function needs to be executed.
// btn.addEventListener('click',()=>alert("test3"));
// btn.addEventListener('click',()=>console.log("test3"));
//If we are removing any element. It is better to remove event listeners for that element as well.
function clearAll()
{
    let ul=document.querySelector("ul");
    const children = ul.children;
    for(let i=children.length-1;i>=0;i--)
    {
        let child = children[i];
        console.log(child);
        child.remove();
        removeitem(child.firstChild.textContent);
    }
    localStorage.clear();
    checkUI();
}

clr_btn.addEventListener('click',clearAll);

// Event handler also gives us a parameter Event when it is triggered by user. 
// That can be accessed in function attached to it and it comes as parameter to that.

const add_btn = document.querySelector('#add-item');
add_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    let data = document.querySelector('#item-input').value;
    if(data=="")
    {
        alert('Enter the item name');
        return;
    }
    if(isEdit)
    {
        delete_item = document.querySelector('.edit');
        delete_item.remove();
        e.target.textContent="+Add Item";
        isEdit=false;
        removeitem(delete_item.firstChild.textContent);
    }
    add_item(data);
    items = JSON.parse(localStorage.getItem('items'));
    items.push(data);
    localStorage.setItem('items',JSON.stringify(items));
    document.querySelector('#item-input').value ="";
    checkUI();
})


// body=document.querySelector('body');
// body.addEventListener('keypress',e=>{
//     console.log(e.code);
//     console.log(e.keyCode);
//     console.log(e.key);
// })

//remove particular element
function removeitem(item)
{
    items=JSON.parse(localStorage.getItem('items'));
    localStorage.setItem('items',JSON.stringify(items.filter(i=>i!=item)));
}

function removeElement(e)
{
    if(e.target.tagName!='BUTTON')
        return;
    console.log(e.target.tagName);
    if(confirm('Are you sure to delete this item?'))
    {
        e.target.parentElement.remove();
        removeitem(e.target.parentElement.firstChild.textContent);
    }
    checkUI();
    return;
}
items_list.addEventListener('click',removeElement);

//Update specific element
function updateItem(e)
{
    if(e.target.tagName!='LI')
        return;
    items = document.querySelector('.edit');
    if(items!=null)
        items.classList.remove('edit');
    e.target.className="edit";
    item_input.value=e.target.firstChild.textContent;
    isEdit=true;
    add_btn.textContent="Update"
}
items_list.addEventListener('click',updateItem);
//Check UI to remove filter and clear button if there are no tasks present.
function checkUI()
{
    console.log('CheckingUI');
    if(items_list.children.length==0)
    {
        filter.style.display='none';
        clr_btn.style.display='none';
        items=JSON.parse(localStorage.getItem('items'));
        if(items!=null && items.length!=0)
            items.forEach(item=>add_item(item));
        else
            localStorage.setItem('items',JSON.stringify([]));
    }
    if(items_list.children.length!=0)
    {
        filter.style.display='block';
        clr_btn.style.display='block';
    }
}
checkUI();

//Filter items
function filter_items(e)
{
    const text=e.target.value.toLowerCase();
    items = document.querySelectorAll('li');
    items.forEach(element => {
        let name = element.firstChild.textContent.toLowerCase();
        if(name.indexOf(text)!=-1)
            element.style.display='flex';
        else
            element.style.display='none';
    });
}
filter.addEventListener('input',filter_items);








