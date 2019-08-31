import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { D_getAllMembers, D_addMember, D_deleteMember } from '../../utils/dbService';
import MembersAddForm from './MembersAddForm';
import MemberLine from './MemberLine';
import withSecondaryView from '../SecondaryView';

export class MembersEditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.getMembers();
    }

    getMembers = async () => {
        let members = await D_getAllMembers();
        this.setState({ data: members });
        console.log(this.state.data);
    }

    deleteMember = async (name) => {
        await D_deleteMember(name);
        this.getMembers();
    }

    render() {
        return(
            <>
            <div id="options__members-list" className="col-sm-6">
                <h2>Add Members</h2>
                <div className="member-lines">
                    { this.state.data.map( (member, key) => (
                        <MemberLine key={member._id} name={member.name} role={member.role} deleteMember={this.deleteMember} getMembers={this.getMembers}/>
                    ) ) }
                    <MembersAddForm getMembers={this.getMembers}/>
                </div>
            </div>
            <div id="options__role-list" className="col-sm-6">
                <h2>Add roles</h2>
            </div>
            </>
        );
    };
}

export default MembersEditView;