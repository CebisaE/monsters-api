const {Router} = require('express');
// const express = require('express');
const pool = require('../db');

const router = Router();
// const router = express.Router();

// getting all habitats
router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM habitats ORDER BY id ASC', (err, res) => {
        if (err) return next (err);
    
        response.json(res.rows);
    });
});

// getting one habitat
// router.get('/:id', (request, response, next) => {
// const { id } = request.params;

// pool.query('SELECT * FROM habitats WHERE id = $1', [id], (err, res) => {
//     if (err) return next (err);

//     response.json(res.rows);
// });
// });

// adding new habitat
router.post('/', (request, response, next) => {
const { name, climate, temperature } = request.body;

pool.query(
    'INSERT INTO habitats (name, climate, temperature) VALUES($1, $2, $3)', 
    [name, climate, temperature],

    (err, res) => {
        if (err) return next(err);

        response.redirect('/habitats');
    }
);
});

// update a monster 
// router.put('/:id', (request, response, next) => {
//     const { id } = request.params;
//     const keys = ['name', 'personality'];
//     const fields = [];

//     keys.forEach(key => {
//         if (request.body[key]) fields.push(key);
//     });

//     fields.forEach((field, index) => {
//         pool.query(
//             `UPDATE monsters SET ${field}=($1) WHERE id=($2)`,
//             [request.body[field],id],
//             (err, res) => {
//                 if (err) return next(err);
    
//                 if (index === fields.length -1 ) response.redirect('/monsters');
//             }
//         );
//     });
// });

// delete a monster
// router.delete('/:id', (request, response, next) => {
//  const { id } = request.params;


//  pool.query('DELETE FROM monsters WHERE id=($1)', [id], (err, res) => {
//     if (err) return next(err);

//     response.redirect('/monsters')
//  });
// });


module.exports = router;