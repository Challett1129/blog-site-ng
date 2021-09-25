async function editFormHandler(e) {
    e.preventDefault();
  
    title = document.querySelector('input[name="post-title"]').value;
    text_body = document.querySelector('#text-body').value.trim();
    id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]
    
    const response = await fetch(`/api/posts/${id}`, { 
        method: 'PUT', 
        body: JSON.stringify({
            title,
            text_body
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}





document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);