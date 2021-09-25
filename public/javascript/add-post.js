async function newFormHandler(e) {
    e.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const text_body = document.querySelector('#text-body').value.trim();
    if (title && text_body) {
        const response = await fetch('/api/posts/', {
            method: 'post', 
            body: JSON.stringify({
                title, 
                text_body
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
     
}


document.querySelector(".new-post-form").addEventListener('submit', newFormHandler);