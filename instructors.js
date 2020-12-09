const fs = require('fs');
const data = require('./data.json');

exports.show = (req, res) => {
    const { id } = req.params;

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id;
    });

    if (!foundInstructor) {
        return res.send('Instructor not found');
    }

    const instructor = {
        ...foundInstructor,
        age: '',
        services: foundInstructor.services.split(','),
        created_at: ''
    }

    return res.render('instructors/show', { instructor });
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (!req.body[key]) {
            return res.send('Por favor, preencha todos os campos');
        }   
    }
    
    let { avatar_url, birth, name, services, gender } = req.body;
    
    const id = Number(data.instructors.length + 1);
    birth = Date.parse(birth);
    const created_at = Date.now();

    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at
    });

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (error) => {
        if (error) {
            return res.send('Write file error');
        }

        return res.redirect('instructors');
    });
}