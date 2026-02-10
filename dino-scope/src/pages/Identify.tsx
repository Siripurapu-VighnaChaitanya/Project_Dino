import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { motion } from 'framer-motion';
import { Upload, Scan, Loader2, CheckCircle } from 'lucide-react';

export const Identify: React.FC = () => {
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [predictions, setPredictions] = useState<any[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const imageRef = useRef<HTMLImageElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadModel();
    }, []);

    const loadModel = async () => {
        try {
            await tf.ready();
            const loadedModel = await mobilenet.load();
            setModel(loadedModel);
            setIsModelLoading(false);
        } catch (error) {
            console.error("Failed to load model", error);
        }
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setImageURL(url);
            setPredictions([]);
        }
    };

    const analyzeImage = async () => {
        if (!model || !imageRef.current) return;
        setIsAnalyzing(true);
        try {
            const results = await model.classify(imageRef.current);
            setPredictions(results);
        } catch (error) {
            console.error("Prediction error", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="bg-obsidian min-h-screen pt-24 px-6 pb-20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-display font-bold text-white mb-4">Dino Identifier</h1>
                    <p className="text-ash-light">
                        Upload an image of a dinosaur (toy, drawing, or fossil) and our AI will attempt to classify it.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Upload Area */}
                    <div className="bg-white/5 rounded-3xl p-8 border border-white/10 text-center">
                        <div
                            className="border-2 border-dashed border-white/20 rounded-2xl p-10 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:border-volcanic-orange/50 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imageURL ? (
                                <img
                                    src={imageURL}
                                    ref={imageRef}
                                    alt="Preview"
                                    className="max-h-[300px] rounded-lg object-contain"
                                />
                            ) : (
                                <>
                                    <Upload className="w-12 h-12 text-ash mb-4" />
                                    <p className="text-white font-bold mb-2">Click to Upload Image</p>
                                    <p className="text-sm text-ash-dark">JPG, PNG supported</p>
                                </>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleUpload}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        {imageURL && (
                            <button
                                onClick={analyzeImage}
                                disabled={isAnalyzing || isModelLoading}
                                className="mt-6 w-full py-4 bg-volcanic-orange text-white font-bold uppercase tracking-widest rounded-xl hover:bg-volcanic-magma transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isAnalyzing ? <Loader2 className="animate-spin" /> : <Scan />}
                                {isAnalyzing ? "Analyzing..." : "Identify Species"}
                            </button>
                        )}

                        {isModelLoading && (
                            <p className="mt-4 text-xs text-ash-dark flex items-center justify-center gap-2">
                                <Loader2 className="w-3 h-3 animate-spin" /> Loading AI Model...
                            </p>
                        )}
                    </div>

                    {/* Results Area */}
                    <div className="bg-white/5 rounded-3xl p-8 border border-white/10 min-h-[300px]">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            Analysis Results
                        </h3>

                        {predictions.length > 0 ? (
                            <div className="space-y-4">
                                {predictions.map((pred, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-4 bg-obsidian rounded-xl border border-white/10 flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="text-volcanic-orange font-bold uppercase text-sm tracking-wider">
                                                {Math.round(pred.probability * 100)}% Confidence
                                            </p>
                                            <p className="text-white text-lg capitalize">{pred.className}</p>
                                        </div>
                                        {idx === 0 && <CheckCircle className="text-jungle-mist w-6 h-6" />}
                                    </motion.div>
                                ))}

                                <div className="mt-8 p-4 bg-jungle/20 border border-jungle rounded-xl">
                                    <p className="text-sm text-ash-light">
                                        <span className="text-jungle-mist font-bold block mb-1">AI Insight:</span>
                                        If the result isn't a specific dinosaur name, the model might be identifying key features (e.g., "reptile", "lizard"). This is a client-side generic model. For precise dino ID, a custom-trained model would be required.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-ash-dark opacity-50">
                                <Scan className="w-16 h-16 mb-4" />
                                <p>Waiting for analysis...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
