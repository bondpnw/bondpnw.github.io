// Replace with your actual API key
const apiKey = "dc50955858f57f";

// Function to fetch data from the API based on nation ID
async function getNationData() {
  const nationID = document.getElementById('nationID').value;

  // GraphQL query to get nation data by ID
  const query = `
    query {
      nation(id: ${nationID}) {
        nation_name
        leader_name
        alliance {
          alliance_name
        }
      }
    }
  `;

  try {
    // Sending the GraphQL request
    const response = await fetch(`https://api.politicsandwar.com/graphql?api_key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })  // Sending the GraphQL query in the body
    });

    const data = await response.json();

    // Process the response
    if (data.data && data.data.nation) {
      document.getElementById('nationName').innerText = data.data.nation.nation_name;
      document.getElementById('leaderName').innerText = data.data.nation.leader_name;
      document.getElementById('allianceName').innerText = data.data.nation.alliance.alliance_name;
    } else {
      alert("Error: No data found or invalid nation ID.");
    }
  } catch (error) {
    alert("Error fetching data: " + error.message);
  }
}
