## WHITE PAPER Version 0.1 by Alex Oancea

### Abstract
#

1. Chapter 1 - Problem description
2. Chapter 2 - Solution description
    1. Vision
    2. Users
    3. People driven content
    4. Local authority driven content
    5. Voting & delegation
    6. Use cases
    7. Token model
3. Chapter 3 - Business model
    1. Market size
    2. Revenue model
4. Chapter 4 - Technical solution description
5. Chapter 5 - Stages of development
6. Chapter 6 - Team
7. Sources


### Chapter 1 - Problem description
#

Humans are a pack species. We stay in groups forming communities. These have evolved along the years from villages to full blown cities. Some cities like Paris, London, New York have so many people that it is extremely to impossible to get an oppinion from everyone when a decision needs to be made that affects the local community.

Even if a voting system would be in place, it would be extremely difficult for everyone to check their phones every 5 minutes and if it's something to vote to do so. It requires to be informed on the matter to make the best decision!

Currently there are several solutions in place trying to pull in everyone's thought towards building participatory decisions by local communities by none address the issue of increasing the participation level and rewarding the involved individuals.

### Chapter 2 - Solution description
#

#### Vision

City assistant is community platform giving power to people to vote on solutions to important issues. It is centered around four important point of views:

1. Global - world-wide solution voting collaboration
2. Continental - per continent solution voting collaboration
3. Country - per contry solution voting collaboration
4. City - per city solution voting collaboration(we start with this, hence the name)

We believe in a world where power is given to the people such that decisions are driven by the need of the community and not by the greed of the few.

#### Users

Everyone will be able to access the `City assistant` platform.

Each user will have the following information associated also called the `user profile`:
1. City - used to change the view of information
2. Name - the name can be changed but not their account address
3. Photo

Between normal users and local authorities there should be no difference but in their name.

We might be able to view a history of all changes done to the user profile. Tracking such information will lower the possibility of abuse.

Content will be driven by:
1. People driven
2. Local authority driven

#### People driven content

People from the local community are able to create posts with projects that solve certain issues or enhance already present structures.

We will refer to such post as `community project proposal`

On each `community project proposal` the community can vote in a specific timeframe defined by the one posting it.

A project will have the following information:
1. Appearance date - the date the project appears on the website
2. Voting start date - the date the voting starts
3. Voting end date - the date the voting ends
4. Title - project title
5. Description - project content description

The local community voting on such projects is signaling to the local authorities for it's need, thus increasing the odds of success.

#### Local authority driven content

Like the local community, the local authority can also create posts with projects they would like to implement. We will refer to these as `community project proposal`, just because there is no different who posts it as long as the target is the community!

Apart from just being able to submit single projects, a local authority can drive campaigns which tag multiple projects under the same umbrella.

A campaign will have the following information:
1. Appearance date - the date the campaign appears on the website
2. Voting start date - the date the voting starts
3. Voting end date - the date the voting ends
4. Title - campaign title
5. Description - campaign content description

The campaign information is applied to all projects in the campaign. Projects from a campaign are only visible within the campaign only.

Local authorities will use campaigns when they want to create awareness and gather feedback on a set of projects they want to implement in the forseeable future. 

The local community can vote on individual projects from a campaign and on the campaign itself.

#### Voting & delegation

As mentioned above, voting can be done on specific projects or on the whole campaign. Each user can vote only once.

The number of votes will influence the rewards. This component is called the `reward indexer`. Each time a new vote is casted the `reward indexer` is being calculated based on the following formula:

```
reward indexer(ri) = (votes * 0.1) + (votes / 100)
```

This means that while you get more votes your reward get's even bigger, faster than linear.


The resulting `reward indexer` is then used in calculating the following rewarding tokes:
- City Assistant Reputation - CAR - used in the calculation of CATs, delegation and growing your rank on the platform, rank which illustrates your credibility
- City Assistant Token - CAT - used for posting new projects and campaigns, can also be traded on exchanges

Formulas for calculating the resulting tokens are:

```
- CARs = ri * 1
- CATs = (ri * 0.1) + ((CARs / 1000) * ri)
```

Growing your reputation grows the ammount of tokens you receive


Delegation is an open issue, subject to many changes. The way we envision is:
- Users can delegate specific users to vote for them on projects and campaigns
- Delegation would go by the reputation rank
- Delegation is done by investing delegation points into delegated user(open issue if the reputation should be spent or not)
- Each vote casted by the delegate will bring you some reward, but can't bring you as much as you have voted yourself(it will probably be something like you get 60% always + (% of how much reputation from your total reputation you invested)* 60% - around 40% should go to the delegate for casting the vote - we might even switch the percentages)

The main purpose of delegation is to pretty much `delegate`.

Formulas will come later on.


#### Use cases

Let's take an example of how the `reward indexer` is being calculated:
```
 100 votes =  10 +  1 =  11 ri
 500 votes =  50 +  5 =  55 ri (instead of getting only 1 point as in the case of `100 votes` you now get `5`)
1000 votes = 100 + 10 = 110 ri
```

So let's take an example of how the tokens are being calculated:
```
 100 votes =  11 ri =>  11 * 1 =  11 CARs  
 500 votes =  55 ri =>  55 * 1 =  55 CARs
1000 votes = 110 ri => 110 * 1 = 110 CARs

 100 votes =  11 ri =>  11 * 0.1 + ( 11 / 1000) *  11 =  1.221 CATs  
 500 votes =  55 ri =>  55 * 0.1 + ( 55 / 1000) *  55 =  8.525 CATs
1000 votes = 110 ri => 110 * 0.1 + (110 / 1000) * 110 = 23.100 CATs
```

As we can see, the more reputation you have, the more CATs you get, this is because you are more trustworthy.

**TODO - Add use cases for how we calculate on up and down votes** - there is still a debate if we want to have a specific button to down vote backed by a comment which affects the entire project post only if it gets a high number of votes - meaning that down voting needs to be backed by an explanation and solution and the community needs to agree on it - this is to prevent trolling on the platform


_Note: These formulas are due to change durring implementation if we see there is an imbalance in the force._


Let's take a look of some use cases where delegation might be used:
- A new project is proposed and you don't know much about the subject but you want to vote with an informed decision while you don't have the time to check it out. You trust the delegate to vote accordingly
- New projects are posted every day and you don't have the time to check them out but you still want a vote to be casted
- You are the main driving force in your community. This earns you more revenue as you became a trusted user in the community by investing more time into the platform. You are the user in which other users trust
- You are the secondary driving force in your community. This earns you less revenue but you still contribute fully. Investing your reputation points earns you a portion of the revenue


#### Token model

The tokens on the platform will serve as a means of payment but also a means to grow your reputation.

Tokens:
- are rewarded from votes
- are consumed in posting projects and campaigns
- can be traded on exchange plartforms

We envision the token sale to be:
- 100.000.000 total tokens
- 10% owned by the City Assistant Team
- 85% owned by the community
- 5% given to bounties
- Token exchange rate 1 CAT = $0.10

Bonus: For each 5000 CATs you get a bonus of 50%
```
 5000 CATs =  5000 CATs + 50% *  5000 CATs =  5000 CATs + 2500 CATs =  7500 CATs
12000 CATs = 12000 CATs + 50% * 10000 CATs = 12000 CATs + 5000 CATs = 17000 CATs
```


### Chapter 3 - Business model
#

### Chapter 4 - Technical solution description
#

### Chapter 5 - Stages of development
#

The development life cycle of `City Assistant` requires several stages of developemnt: 
1. Q2 2018 - Concept + R&D
2. Q3 2018 - UI Platform development
3. Q4 2018 - Pre-Alpha Version Release on Test Net
4. Q1 2019 - Alpha & Beta Release on Test Net
5. Q2 2019 - Alpha Release on Main Net
6. 2020 Onwards - Enhancements and voting on Country, Continental, Global issues enters development

_Note: The above information is subject to change as we advance in development and new things are discovered. A diagram for a more visual perspective will be provided soon._

### Chapter 6 - Team
#

### Sources
#

- https://is.mendelu.cz/eknihovna/opory/zobraz_cast.pl?cast=71671
- https://www.slideshare.net/RajendraPSharma/evolution-of-town-cities-and-urban-world-perspective