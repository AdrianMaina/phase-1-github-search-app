document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const repoList = document.getElementById("repos-list");
  
    // Search for users when the form is submitted
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("search").value.trim();
      if (query) {
        searchUsers(query);
      }
    });
  
    // Fetch users from GitHub API
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          displayUsers(data.items);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  
    // Display the searched users
    function displayUsers(users) {
      userList.innerHTML = "";
      repoList.innerHTML = "";
  
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        li.addEventListener("click", () => fetchUserRepos(user.login));
        userList.appendChild(li);
      });
    }
  
    // Fetch repositories for a selected user
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((res) => res.json())
        .then((repos) => {
          displayRepos(repos);
        })
        .catch((error) => console.error("Error fetching repos:", error));
    }
  
    // Display repositories
    function displayRepos(repos) {
      repoList.innerHTML = "";
  
      repos.forEach((repo) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        repoList.appendChild(li);
      });
    }
  });
  