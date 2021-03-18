Microsoft Teams Connector Demo
=======================================

INTRODUCTION
------------
This demo is going to exemplify the use of Microsoft Teams Connector.


HOW TO RUN DEMO
---------------

### Prerequisites

In order to build and run this demo project you'll need:

* Anypoint Studio 6.x
* Microsoft Teams Connector v1.0.0 or higher.
* Working instance of Microsoft Teams
* 2 users in the Microsoft Teams instance (one will be the owner of a team; save the id's for demo usage)

### Test the flows

1. Import the demo project into your workspace via "Anypoint Exchange" or "Import..." from "File" menu.
2. Specify your OAuth2 credentials for 'OAuth_Client_Credentials_Config' and 'OAuth_Authorization_Code_Config' Config in /src/main/resources/mule-app.properties
* for the 'OAuth_Client_Credentials_Config' use the 'Test connection' option to validate the credentials are ok.
3. Run the project in Studio.
4. Perform the 'OAuth Dance' for the 'OAuth_Authorization_Code_Config'; when prompted for permissions, allow them.
	
	
ABOUT THE DEMO
---------------
	
1. `CREATE-TEAM`: This flow creates a new team into the Microsoft Teams instance.

    Provide the required 'displayName', 'description' and 'user' input parameters as http query parameters.

	[GET] The HTTP endpoint listens to the following URL: `http://localhost:8081/createTeam?displayName={teamDisplayName}&description={teamDescription}&user={teamOwnerUser}`

2. `GET-CREATED-TEAM`: This flow retrieves the newly created team.
	
	Provide the required 'team' input parameter as http query parameter.

	[GET] The HTTP endpoint listens to the following URL: `http://localhost:8081/getTeam?team={createdTeamId}`

3. `LIST-TEAM-MEMBERS-FROM-THE-NEW-TEAM`: This flow retrieves the members from the newly created team; it should return 1 member (used at CREATE-TEAM flow).

    Provide the required 'team' input parameter as http query parameter.

	[GET] The HTTP endpoint listens to the following URL: `http://localhost:8081/listTeamMembers?team={createdTeamId}`

4. `LIST-EXISTING-CHANNELS-FROM-THE-NEW-TEAM`: This flow retrieves the channels from the newly created team; it should return 1 channel (a default-generic one).

    Provide the required 'team' input parameter as http query parameter.

	[GET] The HTTP endpoint listens to the following URL: `http://localhost:8081/listChannels?team={createdTeamId}`
	
5. `NEW-HIRE-TEAM-ONBOARDING`: This flow mimics a real-life scenario for on-boarding the new hire; adds a new member to the existing team, creates a new channel in the team, add the member to the created channel, post a 'welcome' message in the channel.

    Provide the required 'channelName', 'team' and 'user' input parameters as http query parameters.

	[GET] The HTTP endpoint listens to the following URL: `http://localhost:8081/newHireFlow?channelName={channelName}&team={createdTeamId}&userToOnboard={userToBeOnboarded}&channelOwner={channelOwner}`
	
	The response should be in a JSON format, containing the welcome message: "content": "Welcome to the team {channelName}"

    Channel owner should be a differnt user than 'userToOnboard'
	
	Repeat step 3. It should return 2 members.
	
    Repeat step 4. It should return 2 channels.
	
6. `DELETE-CHANNEL-FROM-TEAM`: This flow can be used for cleanup purposes. It has no return type.

    [GET] The HTTP endpoint listens to the following URL: `http://localhost:8081/deleteChannel?team={teamId}&channel={channelId}`
    
    Repeat step 4. It should return 1 channel (the generic one).

7. `REMOVE-TEAM-MEMBER`: This flow can be used for cleanup purposes. It has no return type.

    [GET] The HTTP endpoint listens to the following URL: `http://localhost:8081/removeTeamMembers?team={teamId}&member={membershipId}`
    
    Repeat step 3. It should return 1 member (the owner).
