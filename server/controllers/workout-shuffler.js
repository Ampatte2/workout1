 
    //shuffles the monthly workout 
    let workoutShuffler = (workout)=>{
        let sampleWorkout = workout;


        let weekArray = [["chest"], ["legs"]];
        let dArray = ["bicep", "tricep", "back", "shoulder"]
        let monthArray = [];
        let thisMonth = [];
        let c=0;

        //define shuffler
        let arrayShuffler = function(array){

            for(let i = array.length - 1; i > 0; i--){
                  const j = Math.floor(Math.random() * i)
                  const temp = array[i]
                  array[i] = array[j]
                  array[j] = temp
            }
        }

        //shuffle monthArray
        let shuffleMonth =function(){
        
        let i=0;
        while(i<4){
            let thisWeek = [...weekArray];
            let dWeek = [...dArray];
            arrayShuffler(dWeek);
            thisWeek.push(dWeek.slice(0,2));
            thisWeek.push(dWeek.slice(2,4));
            arrayShuffler(thisWeek);
            monthArray.push(thisWeek);
            i++;
            }
        }
        //call shuffleMonth to shuffle monthArray
        shuffleMonth();

        let shuffleSampleIndex = ["chest", "legs","bicep", "tricep", "back", "shoulder"];

        let shuffleSampleWorkout = () =>{
            shuffleSampleIndex.forEach(item=>{
                for(let y=0;y<sampleWorkout[item].length; y++){
                    arrayShuffler(sampleWorkout[item][y]);
                }
            })

        }
        shuffleSampleWorkout();
    
    monthArray.forEach(elem =>{
        let thisWeek = [];
        //takes each element from monthly array at week level and initializes a new week
        
        elem.forEach(work=>{
            //individual workout level
                let thisDay = [];
                if(work.length > 1){
                    let workSection1 = [work[0]]
                    let workSection2 = [work[1]]
                    for(let d=0; d<4;d++){
                     workSection1.push(sampleWorkout[work[0]][d][c]);
                     workSection2.push(sampleWorkout[work[1]][d][c]);
                           }
                    thisDay.push([workSection1, workSection2]);
                    
                }else{
                    let workSection = [work[0]]
                    for(let d=0; d<4;d++){
                        workSection.push(sampleWorkout[work[0]][d][c]);
                        
                              }
                    thisDay.push([workSection]);
                }
                thisWeek.push(thisDay);
            })
       c++
       thisMonth.push(thisWeek)
       thisWeek =[];
    })
    return thisMonth
};

module.exports = {workoutShuffler}