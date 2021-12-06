# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

npm i --save redux react-redux
npm i redux-thunk
npm i redux-persist
npm i redux-debounced
"homepage": "http://tradersell.zacharypellison.com/",

Data {"drivetrain":{"step":6,"vin":"1","drivetrain":"1","engine":"1","year":"1","make":"11","model":"11","state":"1","city":"1","zipCode":"1","phone":"-1","odometer":"1","transmission":"1","trim":"1","fuel_type":"1","body_type":"1","condition":"used","exterior_color":"required1","primary_photo":"","additional_photos":"","vehicle_driving":"yes","transmission_issue":"yes","drivetrain_issue":"yes","steering_issue":"yes","brake_issue":"yes","suspension_issue":"yes","minor_body_damage":"yes","moderate_body_damage":"yes","major_body_damage":"yes","scratches":"yes","glass_damaged_cracked":"yes","lights_damaged_cracked":"yes","minor_body_rust":"yes","moderate_body_rust":"yes","major_body_rust":"yes","aftermarket_parts_exterior":"yes","mismatched_paint_colors":"yes","previous_paint_work":"yes","seat_damage":"yes","carpet_damage":"yes","dashboard_damage":"yes","interior_trim_damage":"yes","sunroof":"yes","navigation":"yes","aftermarket_stereo_equipment":"yes","hvac_not_working":"yes","leather_Or_Leather_type_seats":"yes","radius":"20","loading":false},"engine":"1","year":"1","make":"11","model":"11","state":"1","city":"1","zipCode":"1","phone":"-1"} {"odometer":"1","transmission":"1","trim":"1","fuel_type":"1","body_type":"1","condition":"used","exterior_color":"required1","primary_photo":"","additional_photos":""} {"vehicle_driving":"yes","transmission_issue":"yes","drivetrain_issue":"yes","steering_issue":"yes","brake_issue":"yes","suspension_issue":"yes"} {"minor_body_damage":"yes","moderate_body_damage":"yes","major_body_damage":"yes","scratches":"yes","glass_damaged_cracked":"yes","lights_damaged_cracked":"yes","minor_body_rust":"yes","moderate_body_rust":"yes","major_body_rust":"yes","aftermarket_parts_exterior":"yes","mismatched_paint_colors":"yes","previous_paint_work":"yes"} {"seat_damage":"yes","carpet_damage":"yes","dashboard_damage":"yes","interior_trim_damage":"yes","sunroof":"yes","navigation":"yes","aftermarket_stereo_equipment":"yes","hvac_not_working":"yes","leather_Or_Leather_type_seats":"yes"} {"make":"11","model":"11","radius":"20"}

uplpoad
handleImageChange(e) {
console.log("enter")
e.preventDefault();

        var images= []
        //  let files = Array.from(e.target.files);
        //    files.forEach((file) => {
        //        images.push(file)
        //    });
          this.setState({additional_photos:e.target.files})
          console.log("iamges"+this.state.additional_photos)
       }
       handleUpload(){
        var x = this.state.additional_photos.map((val) => {
            return val.file;
           });
           var data;
          for (let i = 0; i < x.length; i++) {
        //    data.append('bannerImages[' + i + ']', x[i]);
           data('bannerImages[' + i + ']', x[i]);

          }
          alert(data)

       }

live :

React_App_BASE_URL=http://unfilteredfreedom.com/api/public/api
React_App_ACCESS_TOKEN=asdljipwiasdlkgsdogjr
React_App_BASE_URL_IMAGE=https://unfilteredfreedom.com/api/public



local:

React_App_BASE_URL=http://192.168.18.58:8000/api
React_App_ACCESS_TOKEN=asdljipwiasdlkgsdogjr
React_App_BASE_URL_IMAGE=http://192.168.18.58:8000

1 add image for owner ke image -- stuatus -> done
2 alert of update password -- stuatus -> done
3 draft -- stuatus -> done
4 auction ended main accept or reject after admin approval -- stuatus -> done
5 messaging -> emails and backend approval -- stuatus -> pending
6 location radius base filter -- stuatus -> pending
7 filteration in auction ended -- stuatus -> pending
8 Images issue from server side -- stuatus -> pending
9 dealer image is not updating -- stuatus -> done

  
 
ajj bidding waly status, auction end main accpet aur reject wali API's kar le hy , won, lost, applied k filtleration behe ho gae hy
 



1 : We have to set last message time and message
in:
 `/messaging_conversation/${this.props.user?.id}/owner`,
`/messaging_conversation/${this.props.user?.id}/dealer`, status -> Pending  

2 : This in these end tpoint we need to add end time of auction ended
in : 
`/trade_your_car_list`
`sell_your_car_list`                            status -> done 

3 : logout - > session clear                    status -> done

4 messaging -> emails and backend approval -- stuatus -> pending
5 location radius base filter -- stuatus -> pending
6 filteration in auction ended -- stuatus -> pending
7 Images issue from server side -- stuatus -> pending
8 Mileage field is missing  -- status -> pending
9 Status does not udpate from draft to publish i-e view acution
    `/trade_your_car_list`
    `/sell_your_car_list`  
10 
  


  

        "homepage":"https://zeskuptech.com/tradersell/",

"homepage":"http://tradersell.zacharypellison.com/",

http://192.168.18.58:8000/api
LOCAL

LIVE :http://tradersellapi.zacharypellison.com/public/api
.preview-images-list{
display: flex;
flex-wrap: wrap;
}
.image-container{
position: relative;
}
.preview-images-list img{
max-width: 90px !important;
}
.image-btn-close{
position: absolute;
background: black;
top: 1px;
right: 1px;
font-size: 13px;
/_ padding: 2px; _/
border-radius: 32px;
padding: 1px 5px;
cursor: pointer;
}
.image-container{
margin: 10px;
}

    // for (let i = 0; i < this.state.additional_photos.length; i++) {
        //     data.append('additional_photos[' + i + ']', this.state.additional_photos[i]);
        //     alert(this.state.additional_photos[i])
        //    }
        //    alert(JSON.stringify(dataobject2))

tempSubmit = (e) => {
e.preventDefault();
var FormData = require('form-data');
var data = new FormData();
// additional_photos

        var temp_additional_photos = this.state.additional_photos.map((val) => {
            return val.file;
        });
        for (let i = 0; i < temp_additional_photos.length; i++) {
            data.append('additional_photos[' + i + ']', temp_additional_photos[i]);
            alert(i)
        }

        // primary_photo

        var temp_primary_photo = this.state.primary_photo.map((val) => {
            return val.file;
        });
        for (let i = 0; i < temp_primary_photo.length; i++) {
            if(this.state.primary_photo.length - 1 === i){
                data.append('primary_photo[' + i + ']', temp_primary_photo[i]);
            alert(i)
            }
        }
    }






    submuit



        const dataobject1 = {
            vehicle: this.state.vehicle,
            drivetrain: this.state,
            engine: this.state.drivetrain,
            year: this.state.year,
            make: this.state.make,
            model: this.state.model,
            state: this.state.state,
            city: this.state.city,
            zip: this.state.zip,
            phone: this.state.phone,
        }

        const dataobject2 = {
            odometer: this.state.odometer,
            transmission: this.state.transmission,
            trim: this.state.trim,
            fuel_type: this.state.fuel_type,
            body_type: this.state.body_type,
            condition: this.state.condition,
            exterior_color: this.state.exterior_color,
            primary_photo: this.state.primary_photo,
            additional_photos: this.state.additional_photos,
        }
        // alert(JSON.stringify(dataobject2))


        const dataobject3 = {
            vehicle_driving: this.state.vehicle_driving,
            transmission_issue: this.state.transmission_issue,
            drivetrain_issue: this.state.drivetrain_issue,
            steering_issue: this.state.steering_issue,
            brake_issue: this.state.brake_issue,
            suspension_issue: this.state.suspension_issue,
        }
        // alert(JSON.stringify(dataobject3))

        const dataobject4 = {
            minor_body_damage: this.state.minor_body_damage,
            moderate_body_damage: this.state.moderate_body_damage,
            major_body_damage: this.state.major_body_damage,
            scratches: this.state.scratches,
            glass_damaged_cracked: this.state.glass_damaged_cracked,
            lights_damaged_cracked: this.state.lights_damaged_cracked,
            minor_body_rust: this.state.minor_body_rust,
            moderate_body_rust: this.state.moderate_body_rust,
            major_body_rust: this.state.major_body_rust,
            aftermarket_parts_exterior: this.state.aftermarket_parts_exterior,
            mismatched_paint_colors: this.state.mismatched_paint_colors,
            previous_paint_work: this.state.previous_paint_work,
        }
        //         alert(JSON.stringify(dataobject4))



        const dataobject5 = {
            seat_damage: this.state.seat_damage,
            carpet_damage: this.state.carpet_damage,
            dashboard_damage: this.state.dashboard_damage,
            interior_trim_damage: this.state.interior_trim_damage,
            sunroof: this.state.sunroof,
            navigation: this.state.navigation,
            aftermarket_stereo_equipment: this.state.aftermarket_stereo_equipment,
            hvac_not_working: this.state.hvac_not_working,
            leather_Or_Leather_type_seats: this.state.leather_Or_Leather_type_seats,
        }
        //         alert(JSON.stringify(dataobject5))

        const dataobject6 = {
            make: this.state.make,
            model: this.state.model,
            radius: this.state.radius,

        }
        //   alert(JSON.stringify(dataobject6))
        console.log("Data " + JSON.stringify(dataobject1), JSON.stringify(dataobject2), JSON.stringify(dataobject3), JSON.stringify(dataobject4), JSON.stringify(dataobject5), JSON.stringify(dataobject6))


 live : 
 
 React_App_BASE_URL=http://unfilteredfreedom.com/api/public/api
React_App_ACCESS_TOKEN=asdljipwiasdlkgsdogjr
React_App_BASE_URL_IMAGE=https://unfilteredfreedom.com/api/public

