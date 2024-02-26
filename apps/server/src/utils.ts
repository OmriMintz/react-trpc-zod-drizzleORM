export const isItemExpired = (creationDate: Date): boolean => {
   const millisecondsPerDay = 1000 * 60 * 60 * 24 // Milliseconds in a day

   // Calculate the difference in days between today and the creation date
   const differenceInDays = Math.ceil((Date.now() - creationDate.getTime()) / millisecondsPerDay)

   // Check if the difference is within the range of 0 to 7
   return differenceInDays >= 0 && differenceInDays <= 7
}
