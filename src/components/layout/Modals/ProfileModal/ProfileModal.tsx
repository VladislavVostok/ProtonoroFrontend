import { useState } from 'react';
import { X, User, Mail, Briefcase, Save } from 'lucide-react';
import styles from './ProfileModal.module.css';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profileData: any) => void;
  initialData?: {
    name: string;
    email: string;
    role: string;
  };
}

const ProfileModal = ({ isOpen, onClose, onSave, initialData }: ProfileModalProps) => {
  const [name, setName] = useState(initialData?.name || 'Alex Doe');
  const [email, setEmail] = useState(initialData?.email || 'alex.doe@protonoro.com');
  const [role, setRole] = useState(initialData?.role || 'Product Manager');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, role });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Edit Profile</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.avatarSection}>
            <div className={styles.profileAvatarLarge}>
              <span>{name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <button type="button" className={styles.changeAvatarBtn}>
              Change Avatar
            </button>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">
              <User size={16} />
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">
              <Mail size={16} />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role">
              <Briefcase size={16} />
              Role
            </label>
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter your role"
            />
          </div>

          <div className={styles.modalFooter}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;