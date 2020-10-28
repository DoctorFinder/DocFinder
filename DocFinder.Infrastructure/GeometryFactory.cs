using NetTopologySuite;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Infrastructure
{
    static public class GeometryFactory
    {
 //            Instance.CreateGeometryFactory SomeVariable;
        static GeometryFactory()
        { 
        
        }
    }


    static public class StaticSampleClass
    {
        private static readonly int SomeVariable;
        //Static constructor is executed only once when the type is first used.   
        //All classes can have static constructors, not just static classes.  
        static StaticSampleClass()
        {
            SomeVariable = 1;
            //Do the required things  
        }
        public static string ShowValue()
        {
            return string.Format("The value of someVariable is {0}", SomeVariable);
        }
        public static string Message { get; set; }
    }
}
