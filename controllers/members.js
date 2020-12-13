const fs = require('fs');
const data = require('../data.json');
const { age, date } = require('../utils');

exports.index = (req, res) => {
    return res.render('members/index', { members: data.members });
}

exports.show = (req, res) => {
    const { id } = req.params;

    const foundMember = data.members.find((member) => {
        return member.id == id;
    });

    if (!foundMember) {
        return res.send('Member not found');
    }

    const member = {
        ...foundMember,
        age: age(foundMember.birth)
    }

    return res.render('members/show', { member });
}

exports.create = (req, res) => {
    return res.render('members/create');
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (!req.body[key]) {
            return res.send('Por favor, preencha todos os campos');
        }   
    }
    
    let { avatar_url, birth, name, email, gender, blood, weight, height } = req.body;
    birth = Date.parse(birth);

    let id = 1;
    const lastId = data.members[data.members.length - 1].id
    
    if (lastId) {
        id = lastId++;
    }

    data.members.push({
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

        return res.redirect('members');
    });
}

exports.edit = (req, res) => {
    const { id } = req.params;

    const foundMember = data.members.find((member) => {
        return member.id == id;
    });

    if (!foundMember) {
        return res.send('Member not found');
    }

    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render('members/edit', { member });
}

exports.put = (req, res) => {
    const { id } = req.body;
    let index = 0;

    const foundMember = data.members.find((member, foundIndex) => {
        if (id == member.id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundMember) {
        return res.send('Member not found');
    }

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member;

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (error) => {
        if (error) {
            return res.send('Write file error');
        }

        return res.redirect(`members/${id}`);
    });
}

exports.delete = (req, res) => {
    const { id } = req.body;

    const filteredMembers = data.members.filter((member) => {
        return member.id != id;
    });

    data.members = filteredMembers;

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (error) => {
        if (error) {
            return res.send('Write file error');
        }

        return res.redirect('/members');
    });
}