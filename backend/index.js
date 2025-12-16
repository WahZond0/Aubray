const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Simple test endpoint
app.get('/', (req, res) => {
    res.send('Aubray Server is Running!');
});

// Expose Express API as a single Cloud Function
exports.api = functions.https.onRequest(app);

// Example of another Cloud Function
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Callable function to assign a user role
exports.assignUserRole = functions.https.onCall(async (data, context) => {
    // Check if the user is an admin
    if (context.auth.token.role !== 'admin') {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can assign roles.');
    }

    const { uid, role } = data;
    try {
        await admin.auth().setCustomUserClaims(uid, { role });
        return { message: `Success! ${uid} has been made a ${role}.` };
    } catch (error) {
        throw new functions.https.HttpsError('internal', error.message);
    }
});

// Callable function to mark a user as premium
exports.markUserPremium = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }
    const uid = context.auth.uid;
    try {
        await admin.auth().setCustomUserClaims(uid, { premium: true });
        return { message: 'User is now a premium member.' };
    } catch (error) {
        throw new functions.https.HttpsError('internal', error.message);
    }
});

// Callable function to approve a post
exports.approvePost = functions.https.onCall(async (data, context) => {
    if (context.auth.token.role !== 'admin') {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can approve posts.');
    }

    const { postId } = data;
    try {
        await admin.firestore().collection('posts').doc(postId).update({ approved: true });
        return { message: 'Post approved successfully.' };
    } catch (error) {
        throw new functions.https.HttpsError('internal', error.message);
    }
});


// Callable function to submit a post for review
exports.submitPost = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to post.');
    }
    const { content } = data;
    const uid = context.auth.uid;
    try {
        await admin.firestore().collection('posts').add({
            content,
            uid,
            approved: false,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return { message: 'Post submitted for review.' };
    } catch (error) {
        throw new functions.https.HttpsError('internal', error.message);
    }
});

// Callable function to get approved posts
exports.getApprovedPosts = functions.https.onCall(async (data, context) => {
    try {
        const snapshot = await admin.firestore().collection('posts').where('approved', '==', true).orderBy('createdAt', 'desc').get();
        const posts = [];
        snapshot.forEach(doc => {
            posts.push({ id: doc.id, ...doc.data() });
        });
        return { posts };
    } catch (error) {
        throw new functions.https.HttpsError('internal', error.message);
    }
});


// Callable function to get a user's role
exports.getUserRole = functions.https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }
    // The role will be available on the token if it has been set.
    return { role: context.auth.token.role };
});


// SEO related functions (placeholders for now)
exports.updateSEOScore = functions.https.onCall((data, context) => {
    // In a real app, you'd calculate a score based on user activity
    console.log(`Updating SEO score for user ${context.auth.uid}`);
    return { status: 'success' };
});

exports.getSEOTips = functions.https.onCall((data, context) => {
    // In a real app, you'd return tips based on user's content and profile
    return { tips: 'Complete your profile and post regularly to improve your SEO.' };
});
