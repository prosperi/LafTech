class Fact < ApplicationRecord
   self.table_name = 'data_school_facts'
   belongs_to :School, :foreign_key => [:state_lea_id, :state_school_id]
end
