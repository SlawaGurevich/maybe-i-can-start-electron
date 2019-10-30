import React, { Component } from 'react';
import { D_getAllMembers, D_addMember, D_deleteMember, D_getAllRoles, D_addRole, D_deleteRole, D_getRole } from '../../utils/dbService';
import MembersAddForm, { MemberLine } from './MembersAddForm';
import RoleAddForm, { RoleLine } from './RoleAddForm';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export class DataEditView extends Component {
    componentDidMount() {
        this.getData();
        console.log("mounted");
    }

    constructor(props) {
        super(props);
        this.state = {
            members: [{name: "asd", role: "asdsd"}],
            roles: [],
        }
    }

    getData = async () => {
        let members = await D_getAllMembers();
        let roles = await D_getAllRoles();
        this.setState({ members });
        this.setState({ roles });
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

    getRole = async (id) => {
        return await D_getRole(id);
    }

    render() {
        return(
            <>
                <Collapse>
                    <Panel id="members" header={["Edit members ", <b>[{ this.state.members.length }]</b>]} key="1">
                         <div id="options__members-list">
                            <div className="member-lines">
                                { this.state.members.map( (member, key) => (
                                    <MemberLine key={key} name={member.name} picture={member.picture} deleteMember={this.deleteMember} role={member.role} getData={this.getData} getRole={this.getRole}/>
                                ) ) }
                                <MembersAddForm roles={this.state.roles} addMember={this.addMember}/>
                            </div>
                        </div>
                    </Panel>
                    <Panel id="roles" header={["Edit roles ", <b>[{ this.state.roles.length }]</b>]} key="2">
                        <div id="options__role-list">
                            <div className="role-lines">
                                { this.state.roles.map( (role, key) => (
                                    <RoleLine key={role._id} name={role.name} icon={role.icon} deleteRole={this.deleteRole} getData={this.getData}/>
                                ) ) }
                                <RoleAddForm addRole={this.addRole}/>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </>
        );
    };
}

export default DataEditView;
