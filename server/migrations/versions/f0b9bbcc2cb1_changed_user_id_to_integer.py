"""changed user_id to integer

Revision ID: f0b9bbcc2cb1
Revises: d4ce4bb6e8a6
Create Date: 2023-10-06 15:31:55.074081

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f0b9bbcc2cb1'
down_revision = 'd4ce4bb6e8a6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('fk_posts_user_users', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_posts_user_id_users'), 'users', ['user_id'], ['id'])
        batch_op.drop_column('user')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user', sa.VARCHAR(), nullable=True))
        batch_op.drop_constraint(batch_op.f('fk_posts_user_id_users'), type_='foreignkey')
        batch_op.create_foreign_key('fk_posts_user_users', 'users', ['user'], ['id'])
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###
