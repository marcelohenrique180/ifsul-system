package br.com.ifsul.pojo;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Role {
    private @Id @GeneratedValue Long id;

    @Column(unique = true)
    @NotNull
    private String roleName;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Role(){}

    public Role(Long id){
        this.setId(id);
    }
}
