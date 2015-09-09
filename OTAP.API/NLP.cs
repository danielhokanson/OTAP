using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using java.util;
using java.io;
using edu.stanford.nlp.pipeline;
using System.Web.Hosting;
using Newtonsoft.Json.Linq;

namespace OTAP.API
{
    public static class NLP
    {
        private static string _modelLocation = @"~\NLPModels";
        public static string ModelLocation
        {
            set
            {
                NLP.Start(value);
            }
            get
            {
                return _modelLocation;
            }
        }
        private static StanfordCoreNLP pipeline;
        public static void Start(string modelLocation = null)
        {
            var curDir = Environment.CurrentDirectory;
            if (!string.IsNullOrEmpty(modelLocation))
            {
                _modelLocation = modelLocation;
            }
            try
            {
                // Annotation pipeline configuration
                var props = new Properties();
                props.setProperty("annotators", "tokenize, ssplit, pos, lemma, ner, parse, dcoref");
                props.setProperty("sutime.binders", "false");
                props.setProperty("ner.useSUTime", "false");
                // We should change current directory, so StanfordCoreNLP could find all the model files automatically
                Directory.SetCurrentDirectory(HostingEnvironment.MapPath(ModelLocation));
                pipeline = new StanfordCoreNLP(props);
            }
            finally
            {
                Directory.SetCurrentDirectory(curDir);
            }
        }

        public static JObject ProcessText(string text)
        {
            var annotation = new Annotation(text);
            using (java.io.StringWriter writer = new java.io.StringWriter())
            {
                pipeline.annotate(annotation);
                pipeline.jsonPrint(annotation, writer);
                return JObject.Parse(writer.toString());
            }
        }
    }
}