import React, { Component } from 'react';
import { D_getAllMembers, D_addMember, D_deleteMember, D_getAllRoles, D_addRole, D_deleteRole } from '../../utils/dbService';
import MembersAddForm, { MemberLine } from './MembersAddForm';
import RoleAddForm, { RoleLine } from './RoleAddForm';

export class DataEditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            roles: [],
        }
        this.getData();
    }

    getData = async () => {
        let members = await D_getAllMembers();
        let roles = await D_getAllRoles();
        this.setState({ members, roles });
    }

    deleteMember = async (name) => {
        await D_deleteMember(name);
        this.getData();
    }

    addMember = async (imagePath, name, role) => {
      await D_addMember(imagePath, name, role);
      this.getData();
    }

    addRole = async (name, icon) => {
      await D_addRole(name, icon);
      this.getData();
    }

    deleteRole = async (name) => {
        await D_deleteRole(name);
        this.getData();
    }

    render() {
        return(
            <>
            <div id="options__members-list">
                <h2>Manage Members</h2>
                <div className="member-lines">
                    { this.state.members.map( (member, key) => (
                        <MemberLine key={member._id} name={member.name} picture={member.picture} role={member.role} roleObj={member.roleObj} deleteMember={this.deleteMember} getData={this.getData}/>
                    ) ) }
                    <MembersAddForm roles={this.state.roles} addMember={this.addMember}/>
                </div>
            </div>
            <div id="options__role-list">
                <h2>Manage roles</h2>
                <div className="role-lines">
                    { this.state.roles.map( (role, key) => (
                        <RoleLine key={role._id} name={role.name} icon={role.icon} deleteRole={this.deleteRole} getData={this.getData}/>
                    ) ) }
                    <RoleAddForm addRole={this.addRole}/>
                </div>
            </div>
            </>
        );
    };
}

export default DataEditView;
