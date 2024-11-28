export default class Maths {

    static CoordinatesToWorldPoint(radius = 1, lngDegree = 0, latDegree = 0){

        const latRad = (-latDegree * Math.PI) / 180;
        const lngRad = (lngDegree * Math.PI) / 180;

        return {x:radius * Math.cos(latRad) * Math.cos(lngRad)  ,
                y:radius * Math.cos(latRad) * Math.sin(lngRad)  ,
                z:radius * Math.sin(latRad)
        }
    }
}