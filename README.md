<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
<!--
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">SCBites</h3>

  <p align="center">
    Made for the foodies, the connoisseurs, the enthusiasts, the hobbyists, and most importantly, the TROJANS! FIGHT ON! ✌️
    <br />
    <a href="https://github.com/BilboSwaggins33/scbites-client"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://scbites.rocks">Website</a>
    ·
    <a href="https://github.com/BilboSwaggins33/scbites-client/issues">Report Bug</a>
    ·
    <a href="https://github.com/BilboSwaggins33/scbites-client/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

SCBites is a notification app for a better USC dining experience. Users can select specific menu items, keywords, 
and tags relevant to their dietary preferences or interests. If you're craving a particular dish, 
scbites keeps you informed with email notifications.
This repository serves as the client code for the website, https://sbites.rocks. 
It contains code for creating/deleting Realm users, authenticating them, and updating/listening to state changes. 
Visit the scbite server repo to learn more: https://github.com/BilboSwaggins33/scbites-client



<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Mongo][Mongo.db]][Mongo-url]
* [![Express][Express.js]][Express-url]
* [![Node][Node.js]][Node-url]
* [![Realm][Realm.db]][Realm-url]
* [![React][React.js]][React-url]
* [![Azure][Azure.service]][Azure-url]




<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

Please note: if you intend to run and develop this project locally,
you may need to create your own environmental variables and AWS, Realm, and Mongodb instances.

### Prerequisites

You will need to have node installed to run the project.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/BilboSwaggins33/scbites-client.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a Realm Application, and replace the appid located in App.jsx to yours. 

*src/components/App.jsx*
   ```js
    const appId = process.env.REALM_APP_ID;
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Run the following command to start the express server.
   ```sh
   npm start
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Friendlier UI
- [ ] More Customization
  - [ ] pdfs become cluttered with items if a tag is selected
  - [ ] specify whether a dish is for breakfast, lunch, or dinner
- [ ] Generalize menus to any school
    - [ ] Would need an alternative solution to webscraping

See the [open issues](https://github.com/BilboSwaggins33/scbites-client/issues) for a full list of proposed features (and known issues).

Note: I am a student, with limited experience with building and deploying software. There is still a lot of things within the code that
can be improved, and so feel free to provide suggestions and feedback on how to improve the repo!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Aaron Zhang - scbitesinfo@gmail.com

Project Link: [https://github.com/BilboSwaggins33/scbites-client](https://github.com/BilboSwaggins33/scbites-client)

<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/BilboSwaggins33/scbites-client.svg?style=for-the-badge
[contributors-url]: https://github.com/BilboSwaggins33/scbites-client/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/BilboSwaggins33/scbites-client.svg?style=for-the-badge
[forks-url]: https://github.com/BilboSwaggins33/scbites-client/network/members
[stars-shield]: https://img.shields.io/github/stars/BilboSwaggins33/scbites-client.svg?style=for-the-badge
[stars-url]: https://github.com/BilboSwaggins33/scbites-client/stargazers
[issues-shield]: https://img.shields.io/github/issues/BilboSwaggins33/scbites-client.svg?style=for-the-badge
[issues-url]: https://github.com/BilboSwaggins33/scbites-client/issues
[license-shield]: https://img.shields.io/github/license/BilboSwaggins33/scbites-client.svg?style=for-the-badge
[license-url]: https://github.com/BilboSwaggins33/scbites-client/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/aaron-zhang-2454401b6
[SCBites Screen Shot]: https://scbites.rocks
[product-screenshot]: ./public/images/village_dining.jpg

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Mongo.db]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://mongodb.com/
[Realm.db]: https://img.shields.io/badge/Realm-39477F?style=for-the-badge&logo=realm&logoColor=white
[Realm-url]: https://mongodb.com/docs/realm/
[AWS.service]: https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white
[AWS-url]: https://aws.amazon.com/
[Heroku.service]: https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white
[Heroku-url]: https://devcenter.heroku.com/
[Azure.service]: https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white
[Azure-url]: https://azure.microsoft.com/en-us
