// Replace with your actual API key
const apiKey = "dc50955858f57f";

// Example query to fetch nation data
const query = `
  query {
    nation(id: 100541) {
      nation_name
      leader_name
      alliance {
        alliance_name
      }
    }
  }
`;

async function getNationData() {
  const response = await fetch('https://api.politicsandwar.com/graphql?api_key=' + apiKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query })  // Sending the GraphQL query in the body
  });

  const data = await response.json();
  console.log(data);

  // Process the response
  if (data.data && data.data.nation) {
    document.getElementById('nationName').innerText = data.data.nation.nation_name;
    document.getElementById('leaderName').innerText = data.data.nation.leader_name;
    document.getElementById('allianceName').innerText = data.data.nation.alliance.alliance_name;
  } else {
    alert("Error fetching data.");
  }
}